
module.exports = (user, trip, user_trip)=>{
    user.belongsToMany(trip, {through: user_trip} )
    trip.belongsToMany(user, {through: user_trip} )
}