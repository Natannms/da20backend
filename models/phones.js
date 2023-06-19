'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    static associate(models) {
      this.belongsTo(models.Contact, { foreignKey: 'contact_id', as: 'contact' });
    }
  }
  Phones.init({
    contact_id: DataTypes.INTEGER,
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Phones',
  });
  return Phones;
};
