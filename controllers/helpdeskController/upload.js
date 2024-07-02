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
          console.log('datas',datas)
          let data = await getSingleTicket(TicketID)
          console.log('data',data)
          if(data.length>0){
            let issue = data[0].issueTypeId
            let status = data[0].StatusID
            let userId = req.body.loginUser
            console.log(issue,status)
            let msg = "File Uploaded Successfully"
        
            await ticketLog(TicketID,issue,status,msg,userId)

            statusCode.successResponseForCreation(res,msg)
        }else{
          let msg = 'Ticket details are not available for this ticket'
          statusCode.successResponse(res,msg)
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

let getSingleTicket = async(id) =>{
    try{
      console.log('enter ticket detail')
      let data = await db.sequelize.query("Exec helpdesk.logdetails @tic = '"+id+"' ", {
        type: Sequelize.QueryTypes.RAW
       })
       console.log('data1',data[0])
       return data[0]
    }catch(err){
      console.log('Error',err.message)
      return err.message
    }
  }

  let ticketLog = async(ticketId,issue,status,msg,userId)=>{
    try{
      console.log('data',ticketId,issue,status,msg,userId)
      let data = await db.sequelize.query("exec helpdesk.ActivityLog @tic='"+ticketId+"',@iss = '"+issue+"', @stat = '"+status+"', @Act='"+msg+"',@create ='"+userId+"'",{ 
        type: Sequelize.QueryTypes.RAW
        })
       console.log('log',data)
       return data[0]  
  
    }catch(err){
      console.log('err',err.message)
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