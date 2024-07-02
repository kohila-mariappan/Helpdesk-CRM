const express = require('express')
const router = express.Router()
const upload = require('../../controllers/helpdeskController/upload')
const validator = require('../../validator/uploadValidator')



router.post('/file',[validator.uploadValidation],upload.uploadfile)
router.post('/list',upload.attachList)


module.exports = router