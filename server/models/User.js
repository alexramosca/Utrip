const sequelize = require('../config/config.js')
const bcrypt = require('bcrypt')
const { DataTypes } = require("sequelize")


const User = sequelize.define('User', {
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(80),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    addressLine1: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    addressLine2: {
        type: DataTypes.STRING(30),
        
    },
    postalCode: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    province: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING(99),
        allowNull: false,
        defaultValue: 'default.png'
    }
},{
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
          const saltRounds = 10;
          if (user.changed('password')) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
          }
        },
      },
})

module.exports = User