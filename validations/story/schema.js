const Joi = require("joi");

const storyPostingSchema = Joi.object({
  content: Joi.string().required(),
}).unknown();

module.exports = {
  storyPostingSchema,
};