const { Story, sequelize } = require("../models");

const postStory = async (data, id, urlImage) => {

  const story = await Story.create({
    content: data.content,
    userId: id,
    urlImage
  });
  return story;
}

const getAllStory = async () => {
  const story = await Story.findAll({
    order: sequelize.col("updatedAt")
  });
  return story;
}

module.exports = {
  postStory,
  getAllStory,
}