const db = require('../../config.js/dbConnection.js')
//const config = require('../config.js/dbConfig.js')
//const { default: Sequelize } = require('@sequelize/core')
const statusCode = require('../../utils.js/statusCode.js')
const issueType = async(req,res) =>{
    db.sequelize.query('EXEC helpdesk.getIssueType')
    .then(result=>{
      console.log('Result',result)
      //res.send(result)
      const msg = 'Projects List'
      statusCode.successResponseWithData(res, msg, result[0])
  })
    .catch((err)=> console.log('error',err))
}
const priority = async(req,res) =>{
    db.sequelize.query('EXEC helpdesk.PriorityLevels')
    .then(result=>{
      console.log('Result',result)
      //res.send(result)
      const msg = 'Projects List'
      statusCode.successResponseWithData(res, msg, result[0])
  })
    .catch((err)=> console.log('error',err))

}
const status = async(req,res) =>{
    db.sequelize.query('EXEC helpdesk.StatusesList')
    .then(result=>{
      console.log('Result',result)
      //res.send(result)
      const msg = 'Issue Types'
      statusCode.successResponseWithData(res, msg, result[0])
  })
    .catch((err)=> console.log('error',err))

}

module.exports = {issueType,priority,status}