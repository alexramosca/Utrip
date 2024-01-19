
module.exports = (user, trip, user_trip, applications)=>{
    user.belongsToMany(trip, {through: user_trip, foreignKey: 'UserId'} )
    trip.belongsToMany(user, {through: user_trip, foreignKey: 'TripId'} )

    user.hasMany(applications, { foreignKey: 'request_id', sourceKey: 'UserId', as: 'RequestsAsRequester' });
    user.hasMany(applications, { foreignKey: 'driver_id', sourceKey: 'UserId', as: 'RequestsAsDriver' });

    applications.belongsTo(user, { foreignKey: 'request_id', targetKey: 'UserId', as: 'RequestUser' });
    applications.belongsTo(user, { foreignKey: 'driver_id', targetKey: 'UserId', as: 'Driver' });
    applications.belongsTo(trip, { foreignKey: 'TripId'});

}