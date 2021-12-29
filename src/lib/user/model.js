'use strict';

const { DataTypes, Model } = require('sequelize');
const { dbInstance } = require('../db');

class User extends Model { }

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: dbInstance,
    modelName: 'User',
    tableName: 'user',
    indexes: [{ unique: true, fields: ['email'] }],
  },
);

module.exports = User;
