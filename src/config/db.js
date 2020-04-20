const Sequelize = require('sequelize');

const dbConfig = {
    host: "mysql",
    user: "root",
    database: "game_market",
    password: "12345",
    dialect: "mysql",
}

 const connection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

//Connect our Models////////////////////////////////
db.user = require("../Models/user")(connection, Sequelize);

////////////////////////////////////////////////////

module.exports = db;
