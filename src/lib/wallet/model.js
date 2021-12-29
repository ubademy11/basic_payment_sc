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
    freezeTableName: true,
    sequelize: dbInstance,
    modelName: 'Wallet',
    tableName: "wallet",
  },
);

Wallet.belongsTo(User, { as: 'user' })

module.exports = Wallet;
