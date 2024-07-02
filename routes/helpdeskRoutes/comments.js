const express = require('express')
const router = express.Router()
const comment = require('../../controllers/helpdeskController/comments')
const validator = require('../../validator/commentValidator')


router.post('/save',[validator.commentCreationValidation],comment.saveCommment)
router.post('/list',comment.getComments)

module.exports = router