'use strict';

const { DataTypes, Model } = require('sequelize');
const { dbInstance } = require('../db');
const User = require('../user/model');

class Wallet extends Model { }

Wallet.init(
  {
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    privateKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance,
    modelName: 'Wallet',
    tableName: 'wallet',
  },
);

Wallet.belongsTo(User, { as: 'userId' })

module.exports = Wallet;
