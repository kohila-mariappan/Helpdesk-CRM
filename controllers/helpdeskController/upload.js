const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const fs = require('fs');
// const path = require('path')
// const formidable = require('formidable');

let uploadfile = async(req,res) =>{

    const { fileBlob, filename, TicketID, loginUser } = req.body;
    
    const fileContents = Buffer.from(fileBlob, 'base64');
    let newPath = "public/"+filename;

    fs.writeFile(newPath, fileContents, async (err) => {
        if (err) {
        console.error('Error saving file:', err);
        statusCode.errorResponse(res,err)
        } else {
          console.log('File saved successfully');
          let datas = await AttachFilePathinDB(loginUser, TicketID,newPath, filename)
          if(Array.isArray(datas)){
            let msg =`File Uploaded Successfully`
            statusCode.successResponseForCreation(res,msg)
          }else{
            let msg = `Failed to upload a File.${datas}`
            statusCode.errorResponse(res,msg)
          }    
        }
    });

}

let AttachFilePathinDB = async(uploader, ticketId, newPath, filename) =>{

    try{
        let data = db.sequelize.query("EXEC helpdesk.AttachFile @tic= '"+ticketId+"',@file= '"+filename+"',@path = '"+newPath+"',@uploader = '"+uploader+"' ",{
        type: Sequelize.QueryTypes.RAW
       })
       return data

    }catch(err){
      console.log(`DB Error,${err.message}`)
        return err.message
    }

}



let attachList = async(req,res) =>{
    try{
    let id = req.body.TicketID
    let data = await attachmentDetail(id)
    let msg = 'Attachement List'
    statusCode.successResponseWithData(res,msg,data)
    }catch(err){
        statusCode.errorResponse(res,err)
    }
}
let attachmentDetail = async(id) =>{
    try{
      let data = await db.sequelize.query("Exec helpdesk.Attach @tic = '"+id+"' ", {
        type: Sequelize.QueryTypes.RAW
       })
       console.log('data',data)
       return data[0]
    }catch(err){
      console.log('Error',err.message)
      return err.message
    }
  }

module.exports = {uploadfile,attachList}