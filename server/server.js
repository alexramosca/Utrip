const express = require('express');
const cookieParser = require('cookie-parser')
const sequelize = require('./config/config.js')
const cors = require('cors')
const app = express();
app.use(cookieParser())
app.use(express.json())
require('dotenv').config();
//models
const User = require('./models/User.js')
const Trip = require('./models/Trip.js')
const User_trip = require('./models/User_trip.js')
const relationship = require('./models/Relationships.js')(User, Trip, User_trip)
//routes
app.use(cors())
app.use('/users',require('./routes/User.js'))
app.use('/trips',require('./routes/Trip.js'))

sequelize.sync({alter: true}).then(()=>{
    app.listen(process.env.PORT || 3001, ()=>{
        console.log("server running")
    })
})