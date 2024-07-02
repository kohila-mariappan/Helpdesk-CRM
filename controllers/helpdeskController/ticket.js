const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const fs = require('fs')
const excelJS = require("exceljs");
const request = require('request')


const saveTicket = async(req,res) =>{
  try{
    let input = req.body
    if(input.fileBlob){
      let ticketSavedata = await SaveTicketDetails(input)
      if(Array.isArray(ticketSavedata)){
        let data = ticketSavedata[0]
        let ticketId = data.TicketId
        let uploadAttachment = await uploadfile(ticketId,input)
        if(Array.isArray(uploadAttachment)){
          console.log('Upload Success')
        }else{
          console.log(`Upload Failed.${uploadAttachment}`)
        } 
        let msg = `Ticket-${ticketId}- created Successfully`     
        statusCode.successResponseForCreation(res,msg)
        console.log('data',data)
        //Note name1 = reporter name2 =assignee
        let ReportContent = `Below ticket was created to`
        let AssigneContent = `Below ticket was created by`
        let ReportersendMail = await sendEmail(data.TicketId,data.ReporterName,data.Assignee,
          data.ProjectName,data.StatusName,data.PriorityLevel,data.ReporterMail,data.IssueType,data.CreatedDate,ReportContent,msg)
          console.log('ReportersendMailStatus',ReportersendMail)
        let AssigneesendMail = await sendEmail(data.TicketId,data.Assignee,data.ReporterName,
          data.ProjectName,data.StatusName,data.PriorityLevel,data.AssigneMail,data.IssueType,data.CreatedDate,AssigneContent,msg)
          console.log('AssigneesendMail',AssigneesendMail)


      }else{
        let msg = `Failed to create a Ticket.${ticketSavedata}`
        statusCode.successResponse(res,msg)
      }
    }else{
      let ticketSavedata = await SaveTicketDetails(input)
      if(Array.isArray(ticketSavedata)){  
        let data = ticketSavedata[0]
        let msg = `Ticket-${data.TicketId}- created Successfully`
        console.log('data',data)
        //let subject = msg
        statusCode.successResponseForCreation(res,msg)
        let ReportContent = `Below ticket was created to`
        let AssigneContent = `Below ticket was created by`
        let ReportersendMail = await sendEmail(data.TicketId,data.ReporterName,data.Assignee,
          data.ProjectName,data.StatusName,data.PriorityLevel,data.ReporterMail,data.IssueType,data.CreatedDate,ReportContent,msg)
          console.log('ReportersendMail',ReportersendMail)
        let AssigneesendMail = await sendEmail(data.TicketId,data.Assignee,data.ReporterName,
          data.ProjectName,data.StatusName,data.PriorityLevel,data.AssigneMail,data.IssueType,data.CreatedDate,AssigneContent,msg)
          console.log('AssigneesendMail',AssigneesendMail)


      }else{
        let msg = `Failed to create a Ticket.${ticketSavedata}`
        statusCode.successResponse(res,msg)
      }
    }
    // let ticketSavedata = await SaveTicketDetails(input)
    // console.log('datasv',ticketSavedata,ticketSavedata.length)
    //if(Array.isArray(ticketSavedata)){
      //let projectId = req.body.ProjectID
      //let tciketData = await getticketId(projectId)
      //console.log('ticketId',tciketData.length)
     // if(tciketData.length>0){
        //let ticketId = ticketSavedata[0].message
        //console.log('ticketId',ticketId,input.fileBlob)
        //if(input.fileBlob){
          // let uploadAttachment = await uploadfile(ticketId,input)
          // let msg = ticketSavedata[0].message
          //console.log('----upload---',uploadAttachment)
          //let data = await getSingleTicket(ticketId)
          // if(data.length>0){
          //   let issue = data[0].issueTypeId
          //   let status = data[0].StatusID
          //   let userId = req.body.uploader
          //   console.log(issue,status)

          //   let log = await ticketLog(ticketId,issue,status,msg,userId)
           // statusCode.successResponseForCreation(res,msg)

          // }else{
          //   let msg = "Ticket details are not availble"
          //   statusCode.successResponse(res,msg)
          // }
    
    //}else{
      // let msg = ticketId + '-' + 'Ticket created Successfully'
      // let data = await getSingleTicket(ticketId)
      // if(data.length>0){
      //   let issue = data[0].issueTypeId
      //   let status = data[0].StatusID
      //   let userId = req.body.uploader
      //   console.log(issue,status)
  
      //   let log = await ticketLog(ticketId,issue,status,msg,userId)
  
      //   statusCode.successResponseForCreation(res,msg)  

      // }else{
      //     let msg = "Ticket details are not availble"
      //       statusCode.errorResponse(res,msg)        
      //     }
      // }
    //}
    // else{
    //   let msg = 'Ticket creation failed'
    //   statusCode.errorResponse(res,msg)
      
    // }
  // }
  // else{
  //     let msg = `Failed to create a Ticket.${ticketSavedata}`
  //     statusCode.errorResponse(res,msg)
  //   }
    }catch(err){
    console.log("Error",err)
    let msg = `Failed to create a Ticket.${err}`
    statusCode.errorResponse(res,msg)
  }
  
}

const getTicketList = async(req,res) =>{
  try{
    let id = req.body.ProjectID
    let data = await ticketList(id)
    if(Array.isArray(data)){
      let msg = 'Ticket List based on Selected Project'
    statusCode.successResponseWithData(res,msg,data[0])
    }else{
      let msg = `Failed to get Ticket List.${data}`
      statusCode.successResponse(res,msg)
    }   
  }catch(err){
    statusCode.errorResponse(res,err)
  }
  
}

const getTicket = async (req,res) =>{
  try{
    let id = req.body.TicketID
    let userId = req.body.loginUser
    console.log('ticketid', id,userId)
   // let ticketdata = await getSingleTicket(id)
   // console.log('ticketdata',ticketdata)
   // if(ticketdata.length>0){
      // let reporter = ticketdata[0].ReporterID
      // let assigne = ticketdata[0].AssigneeID
      //let isEdit 
      // if((userId === reporter) || (userId === assigne)){
      //   isEdit = true
      // }else{
      //   isEdit = false
      // }
      //let identifyUser = await getUserRole(userId)
      //let assignToAnyOne
      // if(identifyUser.length>0){
      //   let role = identifyUser[0].RoleId
      //   if(role === 1){
      //     assignToAnyOne = true
      //   }else{
      //     assignToAnyOne = false
      //   }
     // }else{
        //assignToAnyOne = false
      //}
      
      let status = await getStatusDetails(id)
      let ticketDetail = await getSingleTicketDetail(id,userId)
      // let ticketdata
      // if(Array.isArray(ticketDetail)){
      //   ticketdata = ticketDetail[0]
      // }else{
      //   ticketdata = ticketDetail
      // }
      let attachment = await attachmentDetail(id)
      let commant = await commentDetail(id)
      let userHistory = await historyDetail(id)
      console.log('data',userHistory)
    
      let data = {
        StatusButtons : status,
        TicketDetails:ticketDetail[0],
        Attachments:attachment,
        Commants:commant,
        History:userHistory,
        // IsEdit : isEdit,
        // AssignToAnyOne:assignToAnyOne
    }
    console.log('data',data)
    statusCode.successResponse(res,data)   

    // }else{
    //   let msg = "Ticket Details are not available"
    //   statusCode.successResponse(res,msg)
    // }
  }catch(err){
    console.log(err)
    statusCode.errorResponse(res,err)
  }
} 

const statusUpdate = async(req,res) =>{
  try{
    let {TicketID,StatusID,loginUser} = req.body
    console.log('TicketID,StatusID,loginUser',TicketID,StatusID,loginUser)    

    let update = await updateStatus(TicketID,StatusID,loginUser)
    //let data = await getSingleTicket(ticketId)
    if(Array.isArray(update)){
      let msg = `Status Updated Successfully`
      let data = update[0]
      console.log('data',data,data.Username)

      // let issue = data[0].issueTypeId
      // let status = data[0].StatusID
      // console.log(issue,status)

      // let log = await ticketLog(ticketId,issue,status,msg,userId)
      // console.log('log',log)

      statusCode.successResponseForCreation(res,msg)
      let content = `${TicketID} - ${data.StatusName} Status Updated Successfully`
      let name = data.Username
      let Email = data.Email
     await EmailSend(msg,content,name,Email)
    }else{
      let msg = `Failed to Update the Status.${update}`
      statusCode.successResponse(res,msg)
    }
    
  }catch(err){
    let msg = `Failed to Update the Status,${err}`
    statusCode.errorResponse(res,msg)
  }

}

const userUpdated = async(req,res) =>{
  try{
    let {TicketID,AssignTo,loginUser} = req.body
    let update = await updateUser(TicketID,AssignTo,loginUser)
    console.log('update',update)

    //let data = await getSingleTicket(ticketId)

    if(Array.isArray(update)){
      let data = update[0]
      // let issue = data[0].issueTypeId
      // let status = data[0].StatusID
      // console.log(issue,status)
      // let userName = await updatedUserName(userId)
      //console.log('userName',userName)
      let msg = `Ticket Assigned To User Successfully`
      let name = data.Username
      let content = `Ticket -${TicketID} - Assigned to ${name} Successfully `
      let email = data.Email
      //let log = await ticketLog(ticketId,issue,status,msg,userId)
      statusCode.successResponseForCreation(res,msg)
      await EmailSend(msg,content,name,email)

    }else{
      let msg = `Failed to Assigned a Ticket To User.${update}`
      statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log("error",err)
    let msg = `Failed to Assigned a Ticket To User.${err}`
    statusCode.errorResponse(res,msg)
  }
}

let SaveTicketDetails = async(input) =>{
  try{
    let {ProjectID,IssueTypeID,Summary,Description,loginUser,UpdatedDate,DueDate,PriorityID,EstimatedHours,ActualHours,WorkflowID,
      IsActive,ModuleID,SubModuleID} = input
          let data = await db.sequelize.query("Exec helpdesk.InsertIssue @ProjectID = '"+ProjectID+"', @IssueTypeID =' "+ IssueTypeID+"',@Summary =' " + Summary+" ',@Description = ' "+Description+"', @ReporterID =' "+loginUser+"',@UpdatedDate= '"+UpdatedDate+"',@DueDate='"+DueDate+"',@PriorityID = '"+PriorityID+"',@EstimatedHours= '"+EstimatedHours+"',@ActualHours= '"+ActualHours+"',@WorkflowID='"+WorkflowID+"',@IsActive= '"+IsActive+"',@ModuleID='"+ModuleID+"',@SubModuleID = '"+SubModuleID+"'",
      { type: Sequelize.QueryTypes.RAW
           })
     console.log('data',data)
     return data[0]

  }catch(err){
    console.log(`DBError${err.message}`)
    return(err.message)
  }
  
  }
 // note ---name1 = ReporterName name2 = Assigne name
  let sendEmail = async(ticketId,name1,name2,project,status,priority,email,type,created,content,msg) =>{
    try{
      let Emailurl = process.env.EmailUrl
      let EmailKey = process.env.EmailKey      
      let date = await getDatefomat(created)
      console.log('date',date)
        const options = {
            method: 'POST',
            url: Emailurl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: EmailKey
            },
            body: {
                content: {
                    html: `<html><head><style>table,tr,td{
                      border: 1px solid black;
                      border-collapse: collapse;
                  }</style></head><body>
                  <div>
                  <p>Hi ${name1}, </p>
                  <p>${content}   ${name2}, Details as below</p>
              </div>
                  <table>
                   
                    <tr>
                        <td>Ticked Id</td>
                        <td>${ticketId}</td>
                    </tr>
                    <tr>
                        <td>Project</td>
                        <td>${project}</td>
                    </tr>
                    <tr>
                        <td>Created Date</td>
                        <td>${date}</td>
                    </tr>
                    <tr>
                        <td>Priority</td>
                        <td>${priority}</td>
                    </tr>
                    <tr>
                        <td>Issue type</td>
                        <td>${type}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>${status}</td>
                    </tr>
                </table>\n<p>Regards,<br>cluBITS</p>\n</body></html>`,
                    subject: msg
                },
                recipients: {to: [{address: email}]}
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

let getDatefomat = async(created) =>{
  let dateObject = new Date(created);
// Extract year, month (zero-indexed), and day
let year = dateObject.getFullYear();
let month = dateObject.getMonth() + 1; // Add 1 to get the actual month
let day = dateObject.getDate();

// Format the date in YYYY-MM-DD
let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

console.log(formattedDate);  // Output: 2024-06-24
return formattedDate
}

let ticketList = async(id) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.TicketDetail @prj = '" + id +"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data[0])
     return data
  }catch(err){
    console.log('DBError',err.message)
    return err.message
  }
}


let getStatusDetails = async(id) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.getTicket @tic = '"+id+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }
}
let getSingleTicketDetail = async(id,userId) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.SingleTicketView @tic = '"+id+"',@usr = '"+userId+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data1',data[0])
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }
}
// let getSingleTicket = async(id) =>{
//   try{
//     console.log('enter ticket detail')
//     let data = await db.sequelize.query("Exec helpdesk.logdetails @tic = '"+id+"' ", {
//       type: Sequelize.QueryTypes.RAW
//      })
//      console.log('data1',data[0])
//      return data[0]
//   }catch(err){
//     console.log('DBError',err.message)
//     return err.message
//   }
// }

let attachmentDetail = async(id) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.Attach @tic = '"+id+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err
  }
}
let commentDetail = async(id) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userComments @tic = '"+id+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err)
    return err
  }
}

// let getticketId = async(projectId) =>{
//   try{
//     let data = await db.sequelize.query("Exec helpdesk.newticketdid @prj = '" + projectId+"'", {
//       type: Sequelize.QueryTypes.RAW
//      })
//      console.log('data',data)
//      return data[0]
//   }catch(err){
//     console.log('Error',err)
//     return err
//   }
// }

let updateStatus = async(TicketId,StatusId,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.updateStatus @tic = '" + TicketId+"',@stat = '"+StatusId+"',@loginUser ='"+loginUser+"'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }

}

// let ticketLog = async(ticketId,issue,status,msg,userId)=>{
//   try{
//     console.log('data',ticketId,issue,status,msg,userId)
//     let data = await db.sequelize.query("exec helpdesk.ActivityLog @tic='"+ticketId+"',@iss = '"+issue+"', @stat = '"+status+"', @Act='"+msg+"',@create ='"+userId+"'",{ 
//       type: Sequelize.QueryTypes.RAW
//       })
//      console.log('log',data)
//      return data[0]  

//   }catch(err){
//     return err
//   }
// }
let uploadfile = async(ticketId,input) =>{
  const { fileBlob, filename, loginUser } = input;
  //let TicketId = id
  console.log('input',input)
  // console.log(fileBlob)
  const fileContents = Buffer.from(fileBlob, 'base64');
  let newPath = "public/"+filename;

  fs.writeFile(newPath, fileContents, async (err) => {
      if (err) {
      console.error('Error saving file:', err);
      return err
      } else {
      console.log('File saved successfully');
      let data = await AttachFilePathinDB(ticketId, filename,newPath,loginUser)
      console.log('data file',data)
      //let msg = "File Uploaded Successfully"
      return data[0]
      //statusCode.successResponseForCreation(res,msg)
      // res.status(200).json({ success: true });
      }
      //return true
  });

}

let AttachFilePathinDB = async(ticketId, filename,newPath,loginUser) =>{
console.log('enter')
  try{
    let data = db.sequelize.query("EXEC helpdesk.AttachFile @tic= '"+ticketId+"',@file= '"+filename+"',@path = '"+newPath+"',@uploader = '"+loginUser+"' ",{
    type: Sequelize.QueryTypes.RAW
   })
   return data

}catch(err){
    return err
}


}

let historyDetail = async(id)=>{
  try{
    console.log('enter')
    let data = await db.sequelize.query("Exec helpdesk.userHistory @tic = '"+id+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err)
    return err
  }

}

let updateUser = async(TicketID,AssignTo,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.updateUser @tic = '" + TicketID+"',@usr = '"+AssignTo+"',@login= '"+loginUser+"'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('dataupdate',data)
     return data[0]
  }catch(err){
    console.log('DB Error',err.message)
    return err.message
  }

}
// let updatedUserName = async(userId) =>{
//   try{
//     let data = await db.sequelize.query("Exec helpdesk.updateUserName @usr = '"+userId+"'", {
//       type: Sequelize.QueryTypes.RAW
//      })
//      return data[0]
//   }catch(err){
//     console.log('Error',err)
//     return err
//   }

// }

let exportExcel = async(req,res) =>{
  try{
    let id = req.body.ProjectID
    let datas = await ticketList(id)
    let ticketData = datas[0]
    console.log('ticket list',ticketData )

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ticket Detail");
    let path = "public/"
    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 }, 
      { header: "TicketId", key: "tic", width: 15 },
      { header: "issuetype", key: "iss", width: 15 },
      { header: "Summary", key: "sum", width: 50 },
      { header: "priorityLevel", key: "prio", width: 15 },
      { header: "Username", key: "user", width: 15 },
      { header: "StatusName", key: "stat", width: 15 },
      { header: "duedate", key: "due", width: 15 },
      { header: "EPIC", key: "epic", width: 10 }
  ];
  // Looping through User data
let counter = 1;
ticketData.forEach((data) => {
  console.log('ticketData',data,data.TicketId)
  data.s_no = counter;
  data.tic = data.TicketId
  data.iss= data.issuetype
  data.sum = data.Summary
  data.prio = data.priorityLevel
  data.user = data.Username
  data.stat= data.StatusName
  data.due = data.DueDate
  data.epic = data.Epic
  console.log('sheeetdata',worksheet.addRow(data)); // Add data in worksheet
  counter++;
});

// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
});

let date = new Date()
let currentDate = date.getTime()
console.log('date',currentDate)
try {
console.log("expath",currentDate)
  await workbook.xlsx.writeFile(`${path}${currentDate}.xlsx`)
   .then(() => {
     res.send({
       status: "success",
       message: "file successfully downloaded",
       path: `${path}${currentDate}.xlsx`
      });
   });
   fs.unlink(path, (err) => {
    if (err) {
      console.error('Error deleting temporary file:', err);
    } else {
      console.log('Data uploaded and temporary file deleted successfully!');
    }
  });
} catch (err) {
    res.send({
    status: "error",
    message: `Something went wrong.${err}`,
  });
  }
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to Export a Sheet.${err}`
    statusCode.errorResponse(res,msg)
  }
}
// let getUserRole = async(userId)=>{
//   try{ 
//       let data = await db.sequelize.query("EXEC helpdesk.userroleid @usr = '"+userId+"' ",{
//           type: Sequelize.QueryTypes.RAW})
//           return data[0]

//   }catch(err){
//       return err
//   }
// }

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






module.exports = {saveTicket,getTicket,getTicketList,statusUpdate,userUpdated,exportExcel}