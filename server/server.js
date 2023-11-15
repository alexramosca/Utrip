const express = require('express');
const sequelize = require('./config/config.js')
const app = express();

sequelize.authenticate().then(()=>{
    console.log("Conexión a la base de datos exitosa")
})



app.listen(process.env.PORT || 3001, ()=>{
    console.log("server running")
})