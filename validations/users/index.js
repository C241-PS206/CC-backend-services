const {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
  userUpdateProfilePictureSchema,
} = require("./schema");

const validateRegisterUserSchema = (payload) => {
  const validateResult = userRegisterSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

const validateLoginUserSchema = (payload) => {
  const validateResult = userLoginSchema.validate(payload);
  if(validateResult.error){
    throw new Error(validateResult.error.message);
  }
}

const validateUpdateUserSchema = (payload) => {
  const validateResult = userUpdateSchema.validate(payload);
  if(validateResult.error){
    throw new Error(validateResult.error.message);
  }
}

const validateUpdateProfilePictureUserSchema = (payload) => {
  const validateResult = userUpdateProfilePictureSchema.validate(payload);
  if(validateResult.error){
    throw new Error(validateResult.error.message);
  }
}

module.exports = {
  validateRegisterUserSchema,
  validateLoginUserSchema,
  validateUpdateUserSchema,
  validateUpdateProfilePictureUserSchema,
};
