
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Expense, { foreignKey: 'userId' });
   }
  return User;
};

// const User = sequelize.define('user', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phoneNumber: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   gender: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true
//   }
  
// });

// User.associate = (models) => {
//   User.hasMany(models.Expense, { foreignKey: 'userId' });
// }
// module.exports = User;
