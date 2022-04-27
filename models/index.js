

const Sequelize = require("sequelize");
const config= require( '../config');
const sequelize = new Sequelize(
    
    config.databaseName,     
    config.databaseUserName,
    config.databasePassword,    
     {
        logging: console.log,
        port:config.mysqlPort,
        host: config.databaseHost,
        dialect: 'mysql', 
        timezone: "Asia/Tehran",
        dialectOptions: {
			timezone: "local",
		}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);


module.exports = db;