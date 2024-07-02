const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const fs = require('fs');
//const path = require('path')
//const formidable = require('formidable');

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
            // let identifyUser = await getUserRole(uploader)
            // console.log('output',identifyUser)
            // //let role = identifyUser[0].RoleId
            // if(identifyUser.length>0){
            //     console.log('identifyUser',identifyUser[0])
            //     let role = identifyUser[0].RoleId                
            //     if(role === 1){
            //         let user = await getUser(uploader)
            //         //console.log('userId',user.length)
            //         if(user.length>0){
            //             //console.log('user',user[0],user[0].uploadedBy)
            //             let userId = user[0].uploadedBy
            //             console.log('update')
            //                 console.log('File saved successfully');
            //                 let datas = await updateLogoInDB(uploader, newPath, filename)
            //                 console.log('data',datas)
            //                 let msg = "Logo Updated Successfully"
            //                 statusCode.successResponseForCreation(res,msg)

            //         }else{
            //             console.log('update')
            //             console.log('File saved successfully');
            //             let datas = await uploadLogoInDB(uploader, newPath, filename)
            //             console.log('data',datas)
            //             let msg = "Logo Uploaded Successfully"
            //             statusCode.successResponseForCreation(res,msg)
            //         } 

            //     }else{
            //         let msg = 'Admin can only change the logo'
            //         statusCode.successResponse(res,msg)

            //     }

            // }else{
            //     let msg = 'Admin can only change the logo'
            //     statusCode.successResponse(res,msg)
            // }
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
// let updateLogo = async(req,res)=>{
//     try{
//         let uploader = req.body.uploader
//         let filename = req.body.filename
//         let fileBlob = req.body.fileBlob
//         const fileContents = Buffer.from(fileBlob, 'base64');
//     let newPath = "public/"+filename;

//     fs.writeFile(newPath, fileContents, async (err) => {
//         if (err) {
//         console.error('Error saving file:', err);
//         statusCode.errorResponse(res,err)

//        } else {
//             let identifyUser = await getUserRole(uploader)
//             console.log('output',identifyUser)
//             //console.log('role',identifyUser[0].RoleId)
//             if(identifyUser.length > 0){
//                 if( identifyUser[0].RoleId === 1){
//                     console.log('File saved successfully');
//                     let datas = await updateLogoInDB(uploader, newPath, filename)
//                     console.log('data',datas)
//                     let msg = "Logo Uploaded Successfully"
//                     statusCode.successResponseForCreation(res,msg)}
//                 }
//             else{
//                 let msg = 'Admin can only change the logo'
//                 statusCode.successResponse(res,msg)
//      }
        
//     }
        

//     })
// }catch(err){
//         console.log("error",err)
//         return err
//     }
// }
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
// let getUserRole = async(uploader)=>{
//     try{ 
//         let data = await db.sequelize.query("EXEC helpdesk.userroleid @usr = '"+uploader+"' ",{
//             type: Sequelize.QueryTypes.RAW})
//             return data[0]

//     }catch(err){
//         return err
//     }
// }
// let updateLogoInDB = async(uploader, newPath, filename) =>{

//     try{
//         console.log('enter')
//         let data = await db.sequelize.query("EXEC helpdesk.updateLogo @logo= '"+filename+"',@path = '"+newPath+"',@uploader = '"+uploader+"' ",{
//         type: Sequelize.QueryTypes.RAW
//        })
//        console.log('dbres',data)
//        return data 

//     }catch(err){
//         return err
//     }
// }
// let getUser = async(uploader)  =>{
//     try{
//         let data = await db.sequelize.query("EXEC helpdesk.logocondition @uploader = '"+uploader+"'")
//         return data[0]

//     }catch(err){
//         console.log('error',err)
//         return err
//     }
// }
module.exports = {uploadLogo,viewLogo}