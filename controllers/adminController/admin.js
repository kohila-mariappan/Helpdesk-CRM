const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const excelJS = require("exceljs");


let createModule = async(req,res)=>{
    try{
        let {ModuleName,Description,loginUser} = req.body
        //let findData = await findModule(moduleName)
        //console.log('findData',findData,findData.length,findData[0])
        //if(findData == 0){
            let data = await insertModule(ModuleName,Description,loginUser)
            //console.log('data',data.length)
            if(Array.isArray(data)){
                let msg = "Module Created Successfully"
                statusCode.successResponseForCreation(res,msg)
    
            }else{
                let msg = data
                statusCode.successResponse(res,msg)
            }    


    }catch(err){
        console.log("Error",err)
        let msg = `Failed to create a Module.${err}`
        statusCode.errorResponse(res,msg)
    }
}

let getModulesList = async(req,res)=>{
    try{
        
        let data = await getModules()
        //console.log('data',data)
        if(Array.isArray(data)){
            let msg = "Module List"
            statusCode.successResponseWithData(res,msg,data)

        }else{
            let msg = data
            statusCode.successResponse(res,msg)
        }
    }catch(err){
        console.log("Error",err)
        let msg = `Failed to get Module List.${err}`
        statusCode.errorResponse(res,msg)
    }
}

let updateModule = async(req,res)=>{
    try{
        let {ModuleId,ModuleName,Description,loginUser} = req.body
        

        let data = await UpdateNewModule(ModuleId,ModuleName,Description,loginUser)
        //console.log('data',data.length)
        if(Array.isArray(data)){
            let msg = "Module Updated Successfully"
            statusCode.successResponseForCreation(res,msg)

        }else{
            let msg = `Module Updation Failed.${data}`
            statusCode.successResponse(res,msg)
        }

    }catch(err){
        console.log("Error",err)
        let msg = `Failed to update a Module.${err}`
        statusCode.errorResponse(res,msg)
    }
}

// let findModule = async(moduleName)=>{
//     try{
//         let data = await db.sequelize.query("Exec helpdesk.findModule @name = '" + moduleName + "'", {
//             type: Sequelize.QueryTypes.RAW
//         })
//         console.log('data',data)
//         return data[0]     
//     }catch(err){
//         return err
//     }
// }


let UpdateNewModule = async(moduleId,moduleName,description,loginUser)=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.updateAdminModule @mid = '" + moduleId + "',@module = '" + moduleName + "',@desc = '" + description + "',@update = '"+loginUser+"' ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]     
    }catch(err){
        console.log(`DBError-${err.message}`)
        return err.message
    }
}
let insertModule = async(moduleName,describtion,loginUser)=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.insertAdminModule @module = '" + moduleName + "',@desc = '" + describtion + "',@create ='"+loginUser+"' ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]      
    }catch(err){
        console.log('DBError',err.message)
        return err.message
    }
}

let getModules = async()=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.getAdminModulList", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]        
    }catch(err){
        console.log(`DBError.${err.message}`)
        return err.message
    }
}
//--------------------------Screens Api----------------------

let createScreen = async(req,res)=>{
    try{
        let {ModuleID,ScreenName,Description,loginUser} = req.body
        //let findScreen = await screen(screenName)
        //console.log('findScreen',findScreen.length)
        //if(findScreen.length == 0){
        let data = await insertScreen(ModuleID,ScreenName,Description,loginUser)
        if(Array.isArray(data)){
            let msg = `Module And Screen Mapped Successfully`
            statusCode.successResponseForCreation(res,msg)
        }else{
            let msg = data
            statusCode.successResponse(res,msg)
        }
        //console.log('data',data.length)
        // if(data.length>0){
        //     let ScreenId = await getScreenId()
        //    // console.log('ScreenId',ScreenId)
        //     if(ScreenId.length>0){
        //         let screenId = ScreenId[0].ScreenId
        //         let mapData = await insertModuleScreenMap(moduleId,screenId,loginUser)
        //         //console.log('mapdata',mapData)
        //         if(mapData.length>0){
        //             let msg = "Screen Created Successfully"
        //             statusCode.successResponseForCreation(res,msg)
        //         }else{
        //             let msg = "Module and Screen Mapping Failed"
        //             statusCode.successResponse(res,msg)
        //         }
                
        //     }else{
        //         let msg = "Screen Creation Failed"
        //         statusCode.successResponse(res,msg)
        //     }
            
        // }else{
        //     let msg = 'Screen creation Failed'
        //     statusCode.successResponse(res,msg)
        // }
        // }else{
        //     let msg = 'ScreenName Alredy Exist.'
        //     statusCode.successResponse(res,msg)        
        // }  

    }catch(err){
        console.log("Error",err)
        let msg = `Failed to Mapping a Module and Screen.${err}`
        statusCode.errorResponse(res,msg)
    }
}

// let  screen = async (screenName) =>{
//     try{
//         let data = await db.sequelize.query("Exec helpdesk.findScreenName @screen = '" + screenName + "' ", {
//             type: Sequelize.QueryTypes.RAW
//         })
//         console.log('data',data)
//         return data[0]    
//     }catch(err){
//         return err
//     }
// }

let getScreenList = async(req,res)=>{
    try{
        
        let data = await getScreens()
        //console.log('data',data)
        if(Array.isArray(data)){
            let msg = "Screen List"
            statusCode.successResponseWithData(res,msg,data)

        }else{
            let msg = data
            statusCode.successResponse(res,msg)
        }
    }catch(err){
        console.log("Error",err)
        statusCode.errorResponse(res,err)
    }
}

let updateScreen = async(req,res)=>{
    try{
        let {ScreenID,ScreenName,Description,loginUser} = req.body       

        let data = await updateScreenName(ScreenID,ScreenName,Description,loginUser)
        //console.log('data',data)
        if(Array.isArray(data)){
                //let mapData = await updatetModuleScreenMap(moduleId,screenId)
                //console.log('mapdata',mapData) 
                //if(mapData.length>0){
                    let msg = "Screen Updated Successfully"
                    statusCode.successResponseForCreation(res,msg)
                // }else{
                //     let msg = "Module and Screen Mapping Failed"
                //     statusCode.successResponse(res,msg)
                // }
                
            
        }else{
            let msg = data
            statusCode.successResponse(res,msg)
        }
    }catch(err){
        console.log("Error",err)
        let msg = `Failed to update screen details.${err}`
        statusCode.errorResponse(res,msg)
    }
}

let moduleScreenList = async(req,res) =>{
    try{
        let moduleId = req.body.ModuleID
        let data = await moduleScreen(moduleId)
        if(Array.isArray(data)){
            let msg = 'Screen list based on Module List'
            statusCode.successResponseWithData(res,msg,data)
        }else{
            let msg = `Failed to get Screen list based on Module.${data}`
            statusCode.successResponse(res,msg)
        }

    }catch(err){
        console.log("Error",err)
        let msg = `Failed to get Module based Screen List.${err}`
        statusCode.errorResponse(res,msg)
    }
}
 
let insertScreen = async(ModuleID,screenName,describtion,loginUser)=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.InsertModuleScreenMapping @screen = '" + screenName + "',@desc = '" + describtion + "',@create = '"+loginUser+"',@mid = '"+ModuleID+"' ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data      
    }catch(err){
        console.log(`DBERRROR -${err.message}`)
        return err.message
    }
}
let updateScreenName = async(ScreenId,ScreenName,Description,loginUser)=>{
    try{
        console.log('enter screen update',ScreenId,ScreenName,Description,loginUser)
        let data = await db.sequelize.query("Exec helpdesk.updateScreen @sid = '" + ScreenId + "',@screen = '" + ScreenName + "',@desc = '" + Description + "',@update = '"+loginUser+ "' ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data      
    }catch(err){
        console.log(`Dberror-${err.message}`)
        return err.message
    }
}

// let getScreenId = async()=>{
//     try{
//         let data = await db.sequelize.query("Exec helpdesk.ScreenId ", {
//             type: Sequelize.QueryTypes.RAW
//         })
//         console.log('data',data)
//         return data[0]      
//     }catch(err){
//         return err
//     }
// }
// let insertModuleScreenMap = async(moduleId,screenId,loginUser)=>{
//     try{
//         let data = await db.sequelize.query("Exec helpdesk.insertModuleScreen @mid = '" + moduleId + "',@sid = '" + screenId + "',@create = '"+loginUser+"' ", {
//             type: Sequelize.QueryTypes.RAW
//         })
//         console.log('data',data)
//         return data      
//     }catch(err){
//         return err
//     }
// }
// let updatetModuleScreenMap = async(moduleId,screenId)=>{
//     try{
//         let data = await db.sequelize.query("Exec helpdesk.updateModuleScreen @mid = '" + moduleId + "',@sid = '" + screenId + "' ", {
//             type: Sequelize.QueryTypes.RAW
//         })
//         console.log('data',data)
//         return data      
//     }catch(err){
//         return err
//     }
// }

let getScreens = async()=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.getScreenList ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]        
    }catch(err){
        console.log(`DB Error-${err.message}`)
        return err.message
    }
}

let moduleScreen = async(moduleId)=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.modulescreenList @mod ='" + moduleId + "' ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]      
    }catch(err){
        return err
    }
}

let roleMapScreen = async(req,res) =>{
    try{
      let {RoleID,ModuleID,ScreenID,loginUser} = req.body
      let mapdata = await roleModuleScreenMap(RoleID,ModuleID,ScreenID,loginUser)
     // console.log('length',mapdata.length)
      if(Array.isArray(mapdata)){
        let msg = `Role,Module and Screen Mapped Successfully`
        statusCode.successResponseForCreation(res,msg)
      }else{
        let msg = `Role,Module and Sreen Mapping Failed.${mapdata}`
        statusCode.successResponse(res,msg)
      }
  
    }catch(err){
      console.log("Error",err)
      let msg = `Failed to Mapping a Role,Module Screens.${err}`
      statusCode.errorResponse(res,msg)
    }
  }
let roleModuleScreenMap = async (roleId,moduleId,screenId,loginUser) =>{
    try{
      let data = await db.sequelize.query("Exec helpdesk.RoleModuleMapping @roid = '" + roleId +"',@mid= '" +moduleId +"',@sid = '" +screenId+"',@create = '"+loginUser+"' " , {
        type: Sequelize.QueryTypes.RAW
       })
       console.log('datas',data.length)
       return data[0]
  
    }catch(err){
      console.log("Error",err.message)
      return err.message
    }
  }

let roleMapScreenList = async (req,res)=>{
    try{
        let data = await getRMSM()
        if(Array.isArray(data)){
            let msg= "Role Mapping List"
            statusCode.successResponseWithData(res,msg,data)
        }else{
            let msg = data
            statusCode.successResponse(res,msg)
        }

    }catch(err){
        console.log("Error",err)
        statusCode.errorResponse(res,err)
    }
}


let getRMSM =  async()=>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.getRoleModuleScreenMap ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0]        
    }catch(err){
        console.log(`DB Error-${err.message}`)
        return err.message
    }
}
let exportExcel = async(req,res) =>{
    try{
      let adminData = await getRMSM()
      console.log('Admin Data',adminData )
  
      const workbook = new excelJS.Workbook();
      const worksheet = workbook.addWorksheet("User Roles and Screen Module Details");
      let path = "public/"
      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 }, 
        { header: "MappingID:", key: "id", width: 10 },
        { header: "RoleName", key: "role", width: 25 },
        { header: "ModuleName:", key: "mod", width: 25 },
        { header: "ScreenName:", key: "scn", width: 25 },
        ];
     // Looping through User data
    let counter = 1;
    adminData.forEach((data) => {
    //console.log('ticketData',data,data.MappingID)
     data.s_no = counter;
     data.id =  data.MappingID
     data.role = data.RoleName
     data.mod = data.ModuleName
     data.scn = data.ScreenName
    worksheet.addRow(data); // Add data in worksheet
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

  let dasboard = async(req,res) =>{
    try{
        let data = await dasboardDetails()
        if(Array.isArray(data)){
            console.log('data',data)
            let countData = await ticketCount()
            if(Array.isArray(countData)){
                let msg = 'Dashboard Details'
                let output ={
                    data,
                    countData:countData
                    }
                statusCode.successResponseWithData(res,msg,output)

            }else{
                let msg = `Failed to get Dashboard Details.${countData}`
                statusCode.successResponse(res,msg) 
            }
        }else{
            let msg = `Failed to get Dashboard Details.${data}`
            statusCode.successResponse(res,msg)
        }
    }catch(err){
        let msg =` Failed to get Dashboard Details.${err}`
        statusCode.errorResponse(res,msg)
    }
  }


  let dasboardDetails = async() =>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.GenerateDashboardData ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0] 
    }catch(err){
        console.log(`DBError.${err.message}`)
        return err.message
    }
  }

  let ticketCount = async() =>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.GetTicketCount ", {
            type: Sequelize.QueryTypes.RAW
        })
        console.log('data',data)
        return data[0] 
    }catch(err){
        console.log(`DBError.${err.message}`)
        return err.message
    }
  }





module.exports = {
    createModule,
    getModulesList,
    updateModule,
    createScreen,
    getScreenList,
    updateScreen,
    moduleScreenList,
    roleMapScreen,
    roleMapScreenList,
    exportExcel,
    dasboard
}