const joi = require("joi");
const statusCode = require('../utils.js/statusCode')
const validation = joi.object({
    ProjectID: joi.number().integer().required(),
    IssueTypeID:joi.number().integer().required(),
    //Summary:joi.text().alphanum().min(3).max(25).trim(true).required(),
    //Description:joi.text().alphanum().min(3).max(25).trim(true).required(),
    loginUser:joi.number().integer().required(),
    //AssigneeID:joi.number().integer().required(),
    //UpdatedDate :joi.string().alphanum().required(),
   // DueDate : joi.string().alphanum().required(),
    PriorityID:joi.number().integer().required(),
    //EstimatedHours:joi.number().integer().required(),
    //ActualHours:joi.number().integer().required(),
    //WorkflowID : joi.number().integer().required(),
    //IsActive:joi.boolean().default(true), 
    ModuleID: joi.number().integer().required(),
    SubModuleID:joi.number().integer().required()
});
const newTicketValidation = async (req, res, next) => {
	const payload = {
        ProjectID:req.body.ProjectID,
        IssueTypeID:req.body.IssueTypeID,
        //Summary:req.body.Summary,
        //Description: req.body.Description,
        loginUser:req.body.loginUser,
        //AssigneeID:req.body.AssigneeID,
        //UpdatedDate:req.body.UpdatedDate,
        //DueDate:req.body.DueDate,
        PriorityID:req.body.PriorityID,
        //EstimatedHours:req.body.PriorityID,
        //ActualHours:req.body.ActualHours,
        //WorkflowID:req.body.WorkflowID,
        //IsActive:req.body.IsActive,
        ModuleID:req.body.ModuleID,
        SubModuleID:req.body.SubModuleID
	};

	const { error } = validation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};
const validation1 = joi.object({
    ProjectID: joi.number().integer().required(),
});
const projectIdValidation = async (req, res, next) => {
	const payload = {
		ProjectID: req.body.ProjectID
	};

	const { error } = validation1.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};
const ticvalidation = joi.object({
    TicketID: joi.string().regex(/[A-Z]{3}-[0-9]{4}-[0-9]{4}/).required(),
});
const ticketIdValidation = async (req, res, next) => {
	const payload = {
		TicketID: req.body.TicketID
	};

	const { error } = ticvalidation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

module.exports = {newTicketValidation,projectIdValidation,ticketIdValidation};
