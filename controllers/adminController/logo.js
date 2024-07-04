const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const fs = require('fs');


let uploadLogo = async(req,res) =>{
    try{    
    const { fileBlob, filename, loginUser } = req.body;
    
    //let identifyUser = await getUserRole(uploader)
    //console.log('identifyUser',identifyUser)
    const fileContents = Buffer.from(fileBlob, 'base64');
    let newPath = "public/"+filename;

    fs.writeFile(newPath, fileContents, async (err) => {
        if (err) {
        console.error('Error saving file:', err);
        statusCode.errorResponse(res,err)
        } else {
            console.log('File Saved Successfully')
            let update = await insertLogo(loginUser,newPath,filename)
            if(Array.isArray(update)){
                let msg = update[0].msg
                statusCode.successResponseForCreation(res,msg)
            }else{
                let msg = update
                statusCode.successResponse(res,msg)
            }
        }
    })
}catch(err){
    console.log("Error",err)
    let msg = `Failed to Upload Logo.${err}`
    statusCode.errorResponse(res,msg)
}
}

let viewLogo = async(req,res)=>{
    try{
        let uploader = req.body.loginUser
        let data = await viewedLogo(uploader)
        console.log('data',data)
        if(Array.isArray(data)){
            let msg = 'Logo Details'
            let logodata = data
            statusCode.successResponseWithData(res,msg,logodata)
        }
        else{
            let msg = 'Can you Please,Update your Logo'
            console.log('no data')
            statusCode.successResponse(res,msg)
        }

    }catch(err){
        let msg = `Failed to view the Logo.${err}`
        statusCode.errorResponse(res,msg)
    }
}

let viewedLogo = async(uploader)=>{
    try{
       
        let data = await db.sequelize.query("EXEC helpdesk.viewupdateLogo @uploader = '"+uploader+"' ",{
        type: Sequelize.QueryTypes.RAW
       })
       console.log('dbres',data)
       return data[0]

    }catch(err){
        console.log('DB Erro',err.message)
        return err.message
    }
}

let insertLogo = async(uploader, newPath, filename) =>{

    try{
        let data = await db.sequelize.query("EXEC helpdesk.uploadLogo @logo= '"+filename+"',@path = '"+newPath+"',@usr = '"+uploader+"' ",{
        type: Sequelize.QueryTypes.RAW
       })
       console.log('dbres',data)
       return data[0]
    }catch(err){
        console.log('ERR',err.message)
        return err.message
    }

}
module.exports = {uploadLogo,viewLogo}