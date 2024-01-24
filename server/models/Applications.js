const sequelize = require('../config/config.js')
const { DataTypes } = require("sequelize")
const  User_trip  = require('./User_trip.js');



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
    timestamps: false,
    hooks: {
        afterUpdate: async (application, options) => {
            const applicationFields = application.dataValues
            if (application.is_active) {
               
            await User_trip.create(
              {
                UserId: applicationFields.requester_id,
                TripId: applicationFields.TripId,
                isDriver: false
              },
              { transaction: options.transaction }
            );
          }
        },
      },
})

module.exports = Applications