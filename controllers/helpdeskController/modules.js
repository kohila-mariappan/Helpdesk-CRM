const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')


// get submodule,priority,issue type based on project and module id

let getModuleDetail = async (req,res) =>{
    try{
        let projectId = req.body.ProjectID
        let moduleId = req.body.ModuleID
        let subModuleDetail = await getSubModuleDtail(projectId,moduleId)
        let IssueTypeDetails = await getIssueTypes()
        let PriorityDetails = await getPriorityTypes()
    
        let data = {
            subModuleList: subModuleDetail, 
            IssueTypeList: IssueTypeDetails,
            PriorityList: PriorityDetails,
        }
        const msg = 'Sub Modules Detail'
        statusCode.successResponseWithData(res,msg,data)
    }catch(err){
        console.log('Error',err)
        statusCode.errorResponse(res,err)
    }
    
}
let getSubModuleDtail = async(projectId,moduleId) =>{
    try{
        let data = await db.sequelize.query("Exec helpdesk.getSubModule @prj = '" +projectId +"', @mod ='" + moduleId+"'", {
            type: Sequelize.QueryTypes.RAW
           })
           console.log('data',data)
           return data[0]
    }catch(err){
        console.log("Error",err)
        return err
    }
    
}

let getIssueTypes = async()=>{
    try{
        let data = await db.sequelize.query('EXEC helpdesk.getIssueType',{
            type: Sequelize.QueryTypes.RAW 
        })
        console.log('data',data)
        return data[0]
    }
    catch(err){
        console.log('Error',err)
        return err
    }
}

let getPriorityTypes = async()=>{
    try{
        let data = await db.sequelize.query('EXEC helpdesk.PriorityLevels',{
            type: Sequelize.QueryTypes.RAW 
        })
        console.log('data',data)
        return data[0]
    }
    catch(err){
        console.log('Error',err)
        return err
    }
}

// let getStatuses = async()=>{
//     try{
//         let data = await db.sequelize.query('EXEC helpdesk.StatusesList',{
//             type: Sequelize.QueryTypes.RAW 
//         })
//         console.log('data',data)
//         return data[0]
//     }
//     catch(err){
//         console.log('Error',err)
//         return err
//     }
// }





module.exports = {getModuleDetail}