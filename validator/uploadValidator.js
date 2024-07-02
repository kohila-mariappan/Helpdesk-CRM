const joi = require("joi");
const statusCode = require('../utils.js/statusCode')
const upload = joi.object({
  filename: joi.string().required(),
  fileBlob: joi.string().required(), // Allow empty string or null for fileBlob
  loginUser: joi.number().integer().required(),
  TicketID: joi.number().integer().required()
});

const uploadValidation = (req, res, next) => {
  const payload = {
		filename: req.body.filename,
		fileBlob: req.body.fileBlob,
		loginUser: req.body.loginUser,
    TicketID: req.body.TicketID
    };
  const { error } = upload.validate(payload);
  if (error) {
    statusCode.errorResponse(res,error)
  }
  next();
};

module.exports = {
    uploadValidation
}