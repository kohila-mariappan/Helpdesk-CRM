const express = require('express')
const router = express.Router()
const issueRoutes = require('../../controllers/helpdeskController/issue')


router.get('/issueType',issueRoutes.issueType)
router.get('/priority ',issueRoutes.priority)
router.get('/status ',issueRoutes.status)



module.exports = router