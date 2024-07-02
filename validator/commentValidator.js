const joi = require("joi");
const statusCode = require('../utils.js/statusCode')
const commentCreation = joi.object({
    IssueID:joi.number().integer().required(),
    loginUser: joi.number().integer().required(),
    Comment:joi.string().required(),
	TicketID: joi.string().required(),
	});

const commentCreationValidation = async (req, res, next) => {
	const payload = {
		IssueID: req.body.IssueID,
		loginUser: req.body.loginUser,
		Comment: req.body.Comment,
		TicketID: req.body.TicketID
    };

	const { error } = commentCreation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

module.exports = {
    commentCreationValidation
}