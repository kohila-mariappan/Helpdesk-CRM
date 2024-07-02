const express = require('express')
const router = express.Router()
const logo = require('../../controllers/adminController/logo')
const {uploadValidation} =require('../../validator/adminValidator')

router.post('/upload', [uploadValidation],logo.uploadLogo)
//router.post('/update', logo.updateLogo)
router.post('/view', [uploadValidation],logo.viewLogo)


module.exports = router