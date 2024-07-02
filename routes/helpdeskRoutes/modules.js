const express = require('express')
const router = express.Router()
const projects = require('../../controllers/helpdeskController/modules')
const {moduleIdValidation} = require('../../validator/projectValidator')

router.post('/subModuleList',[moduleIdValidation],projects.getModuleDetail)

module.exports = router