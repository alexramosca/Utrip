const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")



const Trip = sequelize.define('Trip', {
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destiny: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passagerLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isFull: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, 
{
    timestamps: false,
})

module.exports = Trip