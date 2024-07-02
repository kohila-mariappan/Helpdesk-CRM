const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const request = require('request')
require('dotenv').config()



let saveCommment = async(req,res) =>{
    try{
        let input = req.body
        let insertdata = await insertComment(input)
        console.log('insertdata')
        if(Array.isArray(insertdata)){
            console.log('data',insertdata)
            let msg = "Comment Added Successfully"
            statusCode.successResponseForCreation(res,msg)
            let content = `${input.TicketID} - ${insertdata[0].Comment}. Comment Added Successfully`
            console.log('ddddd',msg,content,insertdata[0].AssigneeName,insertdata[0].AssigneeEmail)
            await EmailSend(msg,content,insertdata[0].AssigneeName,insertdata[0].AssigneeEmail)
            await EmailSend(msg,content,insertdata[0].ReporterName,insertdata[0].ReporterEmail)
        }else{
            let msg = `Failed to add comment.${insertdata}`
            statusCode.errorResponse(res,msg)
        }        
    }catch(err){
        console.log('Error',err)
        let msg = `Failed to add Comments.${err}`
        statusCode.successResponse(res,msg)
    }
}

let getComments = async(req,res) =>{
    try{
        let id = req.body.TicketID
        let data = await commentDetail(id)
       // console.log('data',data)
        if(Array.isArray(data)){
            let msg = 'Comments List'
            statusCode.successResponseWithData(res,msg,data)
            
        }else{
            let msg = `Failed to get Comments.${data}`
            statusCode.successResponse(res,msg)
        }        

    }catch(err){
        let msg = `Failed to get load Comments.${err}`
        statusCode.errorResponse(res,msg)
    }
}

let insertComment = async(input) =>{
    try{
        //console.log('user',input.userId)
        let {IssueID,loginUser,Comment,TicketID} = input
        let data = await db.sequelize.query("EXEC helpdesk.InsertCommment @iss= '" +IssueID+ "',@usr= '" +loginUser+ "',@cmt = '" +Comment+ "',@tic = '" +TicketID+ "' ",{
            type: Sequelize.QueryTypes.RAW
           })
           console.log('data',data)
           return data[0]       
    }catch(err){
        console.log(`DB Error.${err.message}`)
        return err.message
    }
}

let commentDetail = async(id) =>{
    try{
      let data = await db.sequelize.query("Exec helpdesk.userComments @tic = '" + id+"' ", {
        type: Sequelize.QueryTypes.RAW
       })
       console.log('data',data)
       return data[0]
    }catch(err){
      console.log('Error',err.message)
      return err.message
    }
  }
  let EmailSend = async(sub,content,name,Email) =>{
    try{
        let Emailurl = process.env.EmailUrl
        let EmailKey = process.env.EmailKey
        const options = {
            method: 'POST',
            url: Emailurl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: EmailKey
            },
            body: {
                content: {
                    html: `<html><head><style>\n</style></head><body><p>Hi ${name}</p><p>${content}</p><p>Regards,<br>cluBITS</p>\n</body></html>`,
                    subject: sub
                },
                recipients: {to: [{address: Email}]}
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
  
    }catch(err){
        console.log('Email Sending Error',err)
        return err
    }
  }

  module.exports ={saveCommment,getComments}