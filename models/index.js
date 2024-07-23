const { Sequelize,DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize('Expense_tracker','postgres','qwert@123',{
  host:'localhost',
  dialect: 'postgres'
});

let db={};
const User = require('../models/user')(sequelize, DataTypes);
const Expense = require('../models/expense')(sequelize, DataTypes);
db.sequelize = sequelize;
db.User=User;
db.Expense=Expense;
module.exports =db;