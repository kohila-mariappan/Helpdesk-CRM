const joi = require("joi");
const statusCode = require('../utils.js/statusCode')

const modules = joi.object({
    ModuleName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    Description:joi.string(),
    loginUser:joi.number().integer().required()
});
const ModuleValidation = async (req, res, next) => {
	const payload = {
		ModuleName: req.body.ModuleName,
        Description: req.body.Description,
        loginUser: req.body.loginUser
	};

	const { error } = modules.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const updateModules = joi.object({
    ModuleID:joi.number().integer().required(),
    ModuleName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    Description:joi.string(),
    loginUser:joi.number().integer().required()
});
const UpdateModuleValidation = async (req, res, next) => {
	const payload = {
        ModuleID:req.body.ModuleID,
		ModuleName: req.body.ModuleName,
        Description: req.body.Description,
        loginUser: req.body.loginUser
	};

	const { error } = updateModules.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const screen = joi.object({
    ModuleID:joi.number().integer().required(),
    ScreenName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    Description:joi.string(),
    loginUser:joi.number().integer().required()
});
const ScreenValidation = async (req, res, next) => {
	const payload = {
        ModuleID:req.body.ModuleID,
		ScreenName: req.body.ScreenName,
        Description: req.body.Description,
        loginUser: req.body.loginUser
	};

	const { error } = screen.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const updateScreen = joi.object({
    ScreenID:joi.number().integer().required(),
    ScreenName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    Description:joi.string(),
    loginUser:joi.number().integer().required()
});
const UpdateScreenValidation = async (req, res, next) => {
	const payload = {
        ScreenID:req.body.ModuleID,
		ScreenName: req.body.ScreenName,
        Description: req.body.Description,
        loginUser: req.body.loginUser
	};

	const { error } = updateScreen.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const moduleScreen = joi.object({
    ModuleID: joi.number().integer().required(),
});
const moduleScreenValidation = async (req, res, next) => {
	const payload = {
		ModuleID: req.body.ModuleID
	};

	const { error } = moduleScreen.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const RolemoduleScreen = joi.object({
    RoleID: joi.number().integer().required(),
    ModuleID: joi.number().integer().required(),
    ScreenID: joi.number().integer().required(),
    loginUser: joi.number().integer().required(),
});
const RolemoduleScreenValidation = async (req, res, next) => {
	const payload = {
		RoleID: req.body.RoleID,
        ModuleID: req.body.ModuleID,
        ScreenID: req.body.ScreenID,
        loginUser: req.body.loginUser
	};

	const { error } = RolemoduleScreen.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const upload = joi.object({
    loginUser: joi.number().integer().required(),
});
const uploadValidation = async (req, res, next) => {
	const payload = {
		loginUser: req.body.loginUser
	};

	const { error } = upload.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};
const login = joi.object({
    Email: joi.string().required(),
    Password: joi.string().required()
});

const loginValidation = async (req, res, next) => {
	const payload = {
		Email: req.body.Email,
        Password: req.body.Password
	};

	const { error } = login.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const profile = joi.object({
    loginUser: joi.number().integer().required(),
});
const profileValidation = async (req, res, next) => {
	const payload = {
		loginUser: req.body.loginUser
	};

	const { error } = profile.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const userCreation = joi.object({
	UserName:joi.string().required(),
	Password: joi.string().required(),
	FullName:joi.string().required(),
    Email: joi.string().required(),
	RoleID:joi.number().integer().required(),
	loginUser: joi.number().integer().required()
});

const userCreationValidation = async (req, res, next) => {
	const payload = {
		UserName: req.body.UserName,
		Password: req.body.Password,
		FullName: req.body.FullName,
		Email: req.body.Email,
		RoleID: req.body.RoleID,
        loginUser: req.body.loginUser
	};

	const { error } = userCreation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const roleCreation = joi.object({
	RoleName:joi.string().required(),
	Description: joi.string().required(),
	loginUser: joi.number().integer().required()
});

const roleCreationValidation = async (req, res, next) => {
	const payload = {
		RoleName: req.body.RoleName,
		Description: req.body.Description,
        loginUser: req.body.loginUser
	};

	const { error } = roleCreation.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

const roleMapping = joi.object({
	UserID: joi.number().integer().required(),
	RoleID: joi.number().integer().required(),
	loginUser: joi.number().integer().required()
});

const roleMappingValidation = async (req, res, next) => {
	const payload = {
		UserID: req.body.UserID,
		RoleID: req.body.RoleID,
        loginUser: req.body.loginUser
	};

	const { error } = roleMapping.validate(payload);
	if (error) {
		const message = `Error in Request Data : ${error.message}`
        statusCode.successResponse(res,message)
	} else {
		next();
	}
};

module.exports = {
	ModuleValidation,
	UpdateModuleValidation,
	ScreenValidation,
    RolemoduleScreenValidation,
    UpdateScreenValidation,
    moduleScreenValidation,
    uploadValidation,
    loginValidation,
	profileValidation,
	userCreationValidation,
	roleCreationValidation,
	roleMappingValidation
};
