const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
//const fs = require('fs')

//get all project list in created ticket form detail this function using sb SP
const getProjects = async(req,res) =>{
  try{
    let projectList = await db.sequelize.query('EXEC helpdesk.getProjects')
    console.log('project',projectList)
        if(Array.isArray(projectList)){
          let msg = 'Project List'
          let data = {
            projectList : projectList[0],
        // tempAttachFileId :tempAttachId[0]
        }
      statusCode.successResponseWithData(res,msg,data)
    }
    else{
      let msg = `Failed to get Projects.${projectList}`
      statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log('Error',err)
    let msg = `Failed to get Project List.${err}`
    statusCode.errorResponse(res,msg)
  }
}

// get all location,module,portfolio based on selected project
const getProjectDetail = async(req,res) =>{
  try{
    let id = req.body.ProjectID
    let locationData = await getLocationDetail(id)
    let moduleData = await getmoduleDetail(id)
    let portfolio = await getPortfolio(id)
  
    let data = {
      locationData :locationData,
      moduleData : moduleData,
      portfolioData: portfolio
    }
    const msg = 'Location and Module Details'
    statusCode.successResponseWithData(res,msg,data)
   }catch(err){
    console.log('Error',err)
    statusCode.errorResponse(res,err)
   } 
}

// get all project list in project screen
const getProjectUsersList = async(req,res) =>{
  try{
    let projectId = req.body.ProjectID
    let usersList = await getUsersList(projectId)    
     console.log('data',usersList)
     if(Array.isArray(usersList)){
      let msg = 'users List'
     statusCode.successResponseWithData(res,msg,usersList)
     }else{
      let msg = `Failed to get UsersList.${usersList}`
      statusCode.successResponse(res,msg)
     }
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get Users List.${err}`
    statusCode.errorResponse(res,msg)
  }
}

let getUsersList  = async(projectId) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.projectUserList @prj = '"+projectId+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('db data',data)
     return data[0]
  }catch(err){
    console.log(`DB Error${err.message}`)
    return err.message
  }
}

const getAllProjects = async() =>{
  try{
    let data = await db.sequelize.query('Exec helpdesk.ProjectList', {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('db data',data)
     return data[0]
  }catch(err){
    console.log("DB Error",err.message)
    return err.message
  }
}

const getmoduleDetail = async(id)=>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.getmodule @prj = '" + id+"'", {
   type: Sequelize.QueryTypes.RAW
  })
  console.log('data',data)
  return data[0]
  }catch(err){
    console.log(err.message)
    return err.message
  }
}

const getLocationDetail = async(id) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.getProject @prj = ' "+id +"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }
}

let getPortfolio = async(projectId) =>{
  try{
  let data = await db.sequelize.query("Exec helpdesk.getPortfolio @prj = ' "+projectId +"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
    }catch(err){
      console.log("Error",err.message)
      return err.message
    }
}
let projectList = async(req,res)=>{
  try{
    let data = await getAllProjects()    
        //console.log('data',projecList)
        if(Array.isArray(data)){
        let msg = 'Project List'
        statusCode.successResponseWithData(res,msg,data)
        }else{
          let msg = `Failed to get Project List.${data}`
          statusCode.successResponse(res,msg)
        }        
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get Project List.${err}`
    statusCode.errorResponse(res,msg)
  }
}

let createProjects = async(req,res) =>{
  try{
    let {ProjectKey,ProjectName,Description,Status,loginUser} = req.body
    //let findData = await findProject(projectKey)
    //console.log('findData',findData,findData[0].ProjectKey)
    //if(findData.length == 0){
      let projects = await createNewProject(ProjectKey,ProjectName,Description,Status,loginUser)
      if(Array.isArray(projects)){
      let msg = "Project created Successfully"
      statusCode.successResponseForCreation(res,msg)
    }else{
      let msg = projects
      statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to create a New Project.${err}`
    statusCode.errorResponse(res,msg)
  }
}



let createNewProject = async(projectKey,projectName,description,status,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.createProject @key = ' "+projectKey +"',@name = ' "+projectName +"', @des = ' "+description +"',@stat = ' "+status +"',@login='"+loginUser+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}

let userProjectMapping = async(req,res) =>{
  try{
    let {UserID,ProjectID,loginUser} = req.body
    let userMap = await userProjectMap(UserID,ProjectID,loginUser)
    if(Array.isArray(userMap)){
      let msg = "User and Project Mapped Successfully"
      statusCode.successResponseForCreation(res,msg)
    }else{
      let msg = `Failed to User Project Mapping.${userMap}`
      statusCode.successResponse(res,msg)
    }

  }catch(err){
    console.log('Error',err)
    let msg = `Failed to create a Mapping between User and Project.${err}`
      statusCode.errorResponse(res,msg)
    }
}

let userProjectMap = async(userId,projectId,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userProjectMapping @usr = ' "+userId +"',@prj = ' "+projectId+"',@create = '"+loginUser+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}
 let userProjectList = async(req,res) =>{
  try{
    let userId = req.body.loginUser
    //let identifyUser = await getUserRole(userId)
    //console.log('identifyUser',identifyUser,identifyUser.length,identifyUser[0].RoleId)
    //if(identifyUser.length>0){
      //let role = identifyUser[0].RoleId
      //if(role === 1){
        let data = await userProjects(userId)    
        console.log('data',data)
        if(Array.isArray(data)){
        let msg = 'Project List'
        statusCode.successResponseWithData(res,msg,data)
        }else{
          let msg = `Failed to get user Project List.${data}`
          statusCode.successResponse(res,msg)
        }        

    //   }else{
    //     let data = await userProjects(userId)
    //   if(data.length>0){
    //     let msg = "Project List"
    //     statusCode.successResponseWithData(res,msg,data[0])
    //   }else{
    //     let msg = "Projects are not availble in this user"
    //     statusCode.successResponse(res,msg)
    //   }
    //   }      
    // }else{
    //   let msg = 'This user has no role'
    //   statusCode.successResponse(res,msg)
    // }
   
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get User Project List.${err}`
    statusCode.errorResponse(res,msg)
  }
 }



 let userProjects = async(userId) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userProjectList @usr = ' "+userId +"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("error",err.message)
    return err.message
  }
 }

 let updateUserProject = async(req,res) =>{
  try{
    let {UserID,ProjectID,loginUser} = req.body
    let data = await updateUserProjects(UserID,ProjectID,loginUser)
    if(Array.isArray(data)){
      let msg = "User Project Mapping Updated Successfully"
      statusCode.successResponseForCreation(res,msg)
    }else{
    let msg = `User Project Mapping Updatation Failed.${data}`
    statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to update user project Mapping.${err}`
    statusCode.errorResponse(res,msg)
  }
 }

 let updateUserProjects = async (userId,projectId,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.updateUserProjectMapping @usr = ' "+userId +"',@prj = ' "+projectId +"',@update = '"+loginUser+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data
  }catch(err){
    console.log("DB Error",err.message)
    return err.message
  }
 }

 let userProjectMapList = async(req,res) =>{ 
  try{
    let data = await userProject()
    if(Array.isArray(data)){
      let msg = "User and Project Mapping List"
      statusCode.successResponseWithData(res,msg,data)

    }else{
      let msg = `Failed to get mapping list.${data}`
      statusCode.successResponse(res,msg)
    }

  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get Project User Mapping List.${err}`
      statusCode.errorResponse(res,msg)
    }
}

let userProject = async()=>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userProjectMapList", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Dberror',err.message)
    return err.message
  }
}


module.exports = {
                  getProjects,
                  getProjectDetail,
                  getmoduleDetail,
                  getProjectUsersList,
                  createProjects,
                  userProjectMapping,
                  userProjectList,
                  updateUserProject,
                  userProjectMapList,
                  projectList
                }