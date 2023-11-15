const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize("sql5662406", "sql5662406", "hdzeTvZCrp", {
        host: "sql5.freesqldatabase.com",
        dialect: 'mysql',
        port: 3306
    })

module.exports = sequelize
 