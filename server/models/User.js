const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")


const User = sequelize.define('User', {

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
        type: DataTypes.STRING(30),
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
    }
},{
    timestamps: false,
})

module.exports = User