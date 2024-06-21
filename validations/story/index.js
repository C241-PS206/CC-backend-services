const {
  storyPostingSchema,
} = require("./schema");

const validateStorySchema = (payload) => {
  const validateResult = storyPostingSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

module.exports = {
  validateStorySchema,
}