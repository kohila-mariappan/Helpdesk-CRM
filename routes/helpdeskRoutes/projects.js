const express = require('express')
const router = express.Router()
const projects = require('../../controllers/helpdeskController/projects')
const validator = require('../../validator/projectValidator')




router.get('/new',projects.getProjects)
router.get('/list',projects.projectList)
//router.post('/new/Attachment',projects.uploadfile)
router.post('/projectId',[validator.projectIdValidation],projects.getProjectDetail)
router.post('/create',[validator.projectCreationValidation],projects.createProjects)
router.post('/userMapping',[validator.userProjectMappingValidation],projects.userProjectMapping)
router.post('/userProject',[validator.userProjectValidation],projects.userProjectList)
router.post('/update/userProject',[validator.updateProjectValidation],projects.updateUserProject)
router.get ('/userProject/list',projects.userProjectMapList)
router.post('/list/users',[validator.listUsersValidation],projects.getProjectUsersList)


module.exports = router