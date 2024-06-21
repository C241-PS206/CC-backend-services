'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Story.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};