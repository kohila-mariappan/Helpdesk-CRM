const express = require('express')
const router = express.Router()
const CommentController = require('../../controllers/LeadController/LeadComments')


router.post('/add',CommentController.CreateComment)
router.post('/list',CommentController.CommentHistory)


module.exports = router