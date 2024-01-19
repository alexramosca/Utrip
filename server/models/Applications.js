const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")



const Applications = sequelize.define('Applications', {
    application_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull: false
    },
}, {
    timestamps: false
})

module.exports = Applications