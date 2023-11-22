
module.exports = (user, trip, user_trip)=>{
    user.belongsToMany(trip, {through: user_trip, foreignKey: 'UserId'} )
    trip.belongsToMany(user, {through: user_trip, foreignKey: 'TripId'} )
}