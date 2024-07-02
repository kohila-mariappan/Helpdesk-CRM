const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')

// const userRegister = async (req, res) => {
//   try {
//     console.log(req.body)
//     if (!(req.body.userName && req.body.userEmail && req.body.userPassword)) {
//       const message = 'All input is required'
//       statusCode.badRequestResponse(res, message)
//     } else {
//       const oldUser = await User.findOne({ where: { userEmail : req.body.userEmail } })
//       if (oldUser) {
//         const message = 'User Already Exist. Please Login'
//         statusCode.dataResponse(res, message)
//       } else {
//         const salt = await bcrypt.genSalt(12)
//         const encryptedPassword = await bcrypt.hash(req.body.userPassword, salt)
//         console.log('encryptedPassword', encryptedPassword)

//         const user = await User.create({
//           userName: req.body.userNameame,
//           userEmail: req.body.userEmail,
//           userPassword: encryptedPassword,
//         })

//         console.log('user', user)

//         const message = 'User Registered Successfully'
//         statusCode.successResponse(res, message)
//       }
//     }
//   } catch (err) {
//     console.log('err', err)
//     const message = 'invalid details'
//     statusCode.errorResponse(res, message)
//   }
// }

// const userLogin = async (req, res) => {
//   try {
//     console.log(req.body.userEmail)
//     const user = await User.findOne({ where: { userEmail: req.body.userEmail } })
//     console.log('user', user)
//     if (!user) {
//       return res.status(404).send({ message: 'User Not found.' })
//     }

//     console.log('1')
//     const passwordIsValid = await bcrypt.compareSync(req.body.userPassword, user.userPassword)
//     console.log('2', passwordIsValid)
//     if (!passwordIsValid) {
//       return res.status(401).send({
//         message: 'Invalid Password!'
//       })
//     }

//     const data = {
//       userDetails: {
//         userId: user.userId,
//         name: user.userName,
//         email: user.userEmail
//       }
//     }
//     const mesage = 'Successfully logged in'
//     // console.log('data',data)
//     statusCode.successResponseWithData(res, mesage, data)
//   } catch (err) {
//     const message = 'Auth failed: Incorrect email or pasword'
//     statusCode.errorResponse(res, message)
//   }
// }

let userLogin = async(req,res) =>{
  try{
    let {Email, Password} = req.body
    
    console.log('inputs',Email,Password)

    let data = await login(Email,Password)
    console.log('data',data)
    if(Array.isArray(data)){
      console.log('data',data[0].RoleID)
      let roleId = data[0].RoleID
      let screendata = await screenData(roleId)
      console.log('screen',screendata)
      //let date = new Date()
      let userId = data[0].UserID
      await lastLogin(userId)
      //if(screendata.length>0){
        let msg = 'Logged in'
        let userData = {
          data,
          screendata
        }
      statusCode.successResponseWithData(res,msg,userData)

      // }else{
      //   let msg = 'no screens viewd for this user role'
      //   statusCode.successResponse(res,msg)
      //}      
    }else{
      let msg = 'Invalid UserName or Password'
      statusCode.errorResponse(res,msg)
    }
    
  }catch(err){
    console.log("error",err)
    let msg = `Failed to login invalid username or password.${err}`
    statusCode.errorResponse(res,msg)
  }  
}
let lastLogin = async (userId) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.updateLoginDate @usr = '"+userId+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}
let login = async(Email,Password)=>{
  try{
    console.log('input',Email,Password)
    let data = await db.sequelize.query("Exec helpdesk.login @Email = '" + Email + "', @Password = '"+Password+"'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }
}
let screenData = async(roleId)=>{
  try{
    console.log('input',roleId)
    let data = await db.sequelize.query("Exec helpdesk.privilage @role = '" + roleId + "'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log('Error',err.message)
    return err.message
  }
}

let profile = async(req,res) =>{
  try{
    let userId = req.body.loginUser
    let data = await userProfile(userId)
    if(Array.isArray(data)){
      let msg = "user Details"
      statusCode.successResponseWithData(res,msg,data)
    }else{
      let msg = `Profile Not Exist.${data}`
      statusCode.errorResponse(res,msg)
    }
  }catch(err){
    console.log('Error',err)
    let msg = `Failed to get User Profile.${err}`
    statusCode.errorResponse(res,msg)
  }
}
let userProfile = async(userId) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.updateUserName @usr = '" + userId + "'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}

let rolesList = async(req,res) =>{
  try{
    let data = await roles()
    if(Array.isArray(data)){
      let msg = "Role List"
      statusCode.successResponseWithData(res,msg,data)
    }else{
      let msg = `Failed to get Role list.${data}`
      statusCode.successResponse(res,msg)
    }

  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get Role List.${err}`
      statusCode.errorResponse(res,msg)
    }
}

let roles = async()=>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.getRoles ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("Error",err.message)
return err.message 
}
}


let userList = async(req,res) =>{
  try{
    let data = await users()
    if(Array.isArray(data)){
      let msg = "User List"
      statusCode.successResponseWithData(res,msg,data)
    }else{
      let msg = `Failed to users.${data}`
      statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get User List.${err}`
      statusCode.errorResponse(res,msg)
    }
}

let users = async()=>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userList ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}


let userRoleMapping = async(req,res) =>{
  try{
    let {UserID,RoleID,loginUser} = req.body    
    console.log('input',UserID,RoleID)
    let data = await userRole(UserID,RoleID,loginUser)
    console.log('data',data)
    if(Array.isArray(data)){
      let msg = "User Role Mapped Successfully"
      statusCode.successResponseForCreation(res,msg)
    }else{
      let msg = `Failed to Mapping a User Role.${data}`
      statusCode.successResponse(res,msg)
    }
  }catch(err){
    console.log("Error",err)
      let msg = 'User Role Mapping failed.' +" "+err
      statusCode.errorResponse(res,msg)
    }
}

let userRole = async(UserID,RoleID,loginUser)=>{
  try{
    console.log("enter role map")
    let data = await db.sequelize.query("Exec helpdesk.userRoleMap @usr = '" + UserID + "',@role = '" + RoleID + "',@create = '"+loginUser+"'", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data
  }catch(err){
    console.log('err',err.message)
    return err.message
  }
}

let userRoleMapList = async(req,res) =>{ 
  try{
    let data = await userRoleMap()
    if(Array.isArray(data)){
      let msg = "User Role Mapped List"
      statusCode.successResponseWithData(res,msg,data)

    }else{
      let msg = `Please assign a role to user.${data}`
      statusCode.successResponse(res,msg)
    }

  }catch(err){
    console.log("Error",err)
    let msg = `Failed to get User Role Mapping list.${err}`
      statusCode.errorResponse(res,msg)
    }
}

let userRoleMap = async()=>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.userRoleMapList", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log(`DB Error-${err}`)
    return err.message
  }
}

let userCreation = async(req,res) =>{
  try{
    let {UserName,Password,FullName,Email,RoleID,loginUser} = req.body
    //let finddata = await findUSer(email)
    //console.log('finddata',finddata)
    //if(finddata.length == 0){
      let data = await newUser(UserName,Password,FullName,Email,RoleID,loginUser)
      //let getUserId = await getNewUserId()
      console.log('data',data)
    if(Array.isArray(data)){
      let msg = `User -${Email}-Created successfully`
      statusCode.successResponseForCreation(res,msg)
      //await userRole(data[0].UserID,roleId,loginUser)
    }else{
      let msg = `User Creation Failed - ${data}`
      statusCode.successResponse(res,msg)
    }
    // }else{
    //   let msg = finddata[0].Email + " "+ "User already Exist."
    //   statusCode.successResponse(res,msg)
    // }
   
  }catch(err){
    console.log("Error",err)
    let msg = 'User Creation Failed'+" " + err
    statusCode.errorResponse(res,msg)
  }
}

// let findUSer = async(email)=>{
//   try{
//     let data = await db.sequelize.query("Exec helpdesk.findUser @email = '"+ email +"' ", {
//       type: Sequelize.QueryTypes.RAW
//      })
//      console.log('find user data',data)
//      return data[0]
//   }catch(err){
//     console.log("Error",err)
//     return err
//   }
// }

let newUser = async (UserName,Password,FullName,Email,RoleID,loginUser) =>{
  try{
    console.log('inputs',UserName,Password,FullName,Email,RoleID)
    let data = await db.sequelize.query("Exec helpdesk.userCreation @usr = '"+UserName+"',@pwd = '"+Password+"',@name= '"+FullName+"',@email = '"+ Email +"',@role = '"+RoleID+"',@create = '"+loginUser+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }
}

// let  getNewUserId = async()=>{
//   try{
//     let data = await db.sequelize.query("Exec helpdesk.newUserId ", {
//       type: Sequelize.QueryTypes.RAW
//      })
//      console.log('data',data)
//      return data[0]
//   }catch(err){
//     console.log("Error",err)
//     return err
//   }
// }

let RoleCreation = async (req,res) =>{
  try{
    let {RoleName,Description,loginUser} = req.body
    let data = await createRole(RoleName,Description,loginUser)
    if(Array.isArray(data)){
      let msg = `${RoleName} - Role Created Successfully`
      statusCode.successResponseForCreation(res,msg)
    }else{
      let msg = `${data} - Failed to create a Role`
      statusCode.successResponse(res,msg)
    }   

  }catch(err){
    let msg = `Failed to Create a Role.${err}`
    statusCode.errorResponse(res,msg)
  }
}

let createRole = async (RoleName,Description,loginUser) =>{
  try{
    let data = await db.sequelize.query("Exec helpdesk.RoleCreation @role = '"+RoleName+"',@des = '"+Description+"',@loginUser = '"+loginUser+"' ", {
      type: Sequelize.QueryTypes.RAW
     })
     console.log('data',data)
     return data[0]
  }catch(err){
    console.log("Error",err.message)
    return err.message
  }

}







module.exports = { userLogin,
          profile,
          rolesList,
          userList,
          userRoleMapping,
          userRoleMapList,
          userCreation,
          RoleCreation
         }