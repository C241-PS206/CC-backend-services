'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authentication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Authentication.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Authentication.init({
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Authentication',
  });
  return Authentication;
};