const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jwt: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'token',
  }
);

module.exports = Token;
