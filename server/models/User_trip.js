const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")


const User_trip = sequelize.define('User_trip', {
    isDriver: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    timestamps: false,
}
)

module.exports = User_trip