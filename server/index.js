const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path')
const sequelize = require('./config/config.js')
const https = require('https');
const fs = require('fs');
const cors = require('cors')
const app = express();
//https certificatess
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.cert', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

app.use(cookieParser())
app.use(express.json())
require('dotenv').config();
//models
const User = require('./models/User.js')
const Trip = require('./models/Trip.js')
const User_trip = require('./models/User_trip.js')
const Applications = require('./models/Applications.js')
const relationship = require('./models/Relationships.js')(User, Trip, User_trip, Applications)
//routes
const corsOptions = {
  origin: ['http://localhost:3000'],  
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Range,X-Content-Range',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  maxAge: 86400,
};


app.use(cors(corsOptions));
app.use('/api/users',require('./routes/User.js'))
app.use('/api/trips',require('./routes/Trip.js'))

app.use(express.static(path.join('public')));
app.use((req,res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

sequelize.sync({alter: true}).then(()=>{
  app.listen(process.env.PORT || 3001, ()=>{
        console.log("server running")
    })
})