const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")


const Trip = sequelize.define('Trip', {
    passagerLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isFull: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, 
{
    timestamps: false,
})

module.exports = Trip