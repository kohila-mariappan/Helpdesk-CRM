const joi = require("joi");
const statusCode = require('../utils.js/statusCode')
const validation1 = joi.object({
    ProjectID: joi.number().integer().required(),
});
const validation = joi.object({
    ProjectID: joi.number().integer().required(),
    ModuleID: joi.number().integer().required()
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
const moduleIdValidation = async (req, res, next) => {
	const payload = {
		ProjectID: req.body.ProjectID,
        ModuleID: req.body.ModuleID
	};

	const { error } = validation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};
const projectCreation = joi.object({
	ProjectKey:joi.string().required(),
	ProjectName: joi.string().required(),
	Description:joi.string().required(),
	loginUser: joi.number().integer().required(),
	Status: joi.number().integer().required(),
});

const projectCreationValidation = async (req, res, next) => {
	const payload = {
		ProjectKey: req.body.ProjectKey,
		ProjectName: req.body.ProjectName,
		Description: req.body.Description,
		loginUser: req.body.loginUser,
		Status: req.body.Status,
	};

	const { error } = projectCreation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const userProjectMapping = joi.object({
	UserID: joi.number().integer().required(),
	ProjectID: joi.number().integer().required(),
	loginUser: joi.number().integer().required()

});

const userProjectMappingValidation = async (req, res, next) => {
	const payload = {
		UserID: req.body.UserID,
		ProjectID: req.body.ProjectID,
		loginUser: req.body.loginUser,
	};

	const { error } = userProjectMapping.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const userProject = joi.object({
		loginUser: joi.number().integer().required()
});

const userProjectValidation = async (req, res, next) => {
	const payload = {
		loginUser: req.body.loginUser,
	};

	const { error } = userProject.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const updateProject = joi.object({
	UserID: joi.number().integer().required(),
	ProjectID: joi.number().integer().required(),
	loginUser: joi.number().integer().required()
});

const updateProjectValidation = async (req, res, next) => {
const payload = {
	UserID: req.body.UserID,
	ProjectID: req.body.ProjectID,
	loginUser: req.body.loginUser,
};

const { error } = updateProject.validate(payload);
if (error) {
	const message = `Error in Request Data : ${error.message}`
	statusCode.successResponse(res,message)
} else {
	next();
}
};

const listUsers = joi.object({
	ProjectID: joi.number().integer().required()
});

const listUsersValidation = async (req, res, next) => {
const payload = {
	ProjectID: req.body.ProjectID,
};

const { error } = listUsers.validate(payload);
if (error) {
	const message = `Error in Request Data : ${error.message}`
	statusCode.successResponse(res,message)
} else {
	next();
}
};

module.exports = {
	projectIdValidation,
	moduleIdValidation,
	projectCreationValidation,
	userProjectMappingValidation,
	userProjectValidation,
	updateProjectValidation,
	listUsersValidation
    };