const express = require('express')
const router = express.Router()
const ticket = require('../../controllers/helpdeskController/ticket')
const {newTicketValidation,projectIdValidation,ticketIdValidation} = require('../../validator/ticketValidator')



router.post('/save',[newTicketValidation],ticket.saveTicket)
router.post('/projectId',[projectIdValidation],ticket.getTicketList)
router.post('/ticketId',[ticketIdValidation],ticket.getTicket)
router.post('/statusUpdate',ticket.statusUpdate)
router.post('/assigne',ticket.userUpdated)
router.post('/excel/download',ticket.exportExcel)
router.post('/report',ticket.ReportData)
router.post('/report/export',ticket.exportReportData)

module.exports = router