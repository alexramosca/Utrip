const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize("tfnfuuqh", "tfnfuuqh", "JO1gfiE0gYIU9ANVfOHb2TPwhqp9d9uC", {
        host: "salt.db.elephantsql.com",
        dialect: 'postgres',
        port: 5432
    })

module.exports = sequelize
 