const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")



const Trip = sequelize.define('Trip', {
    TripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    add_departure:{
        type:DataTypes.STRING,
        allowNull: false
    },
    city_departure: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prov_departure:{
        type :DataTypes.STRING(2),
        allowNull: false
    },
    add_arrival:{
        type:DataTypes.STRING,
        allowNull: false
    },
    city_arrival: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prov_arrival:{
        type :DataTypes.STRING(2),
        allowNull: false    
    },
    seats_available: {
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