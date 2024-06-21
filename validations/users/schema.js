const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  username: Joi.string().alphanum().min(4).max(12),
}).unknown();

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown();

const userUpdateProfilePictureSchema = Joi.object({
  fieldname: Joi.string().required(),
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg"),
  filename: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateProfilePictureSchema,
};
