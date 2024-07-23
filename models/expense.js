
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('expense', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Expense.associate = (models) => {
  Expense.belongsTo(models.User, { foreignKey: 'userId' });}
  return Expense;
};


