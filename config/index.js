
require('dotenv').config();
// Set the NODE_ENV to 'development' by default

module.exports= {
  //config for token
  jwtSecret: process.env.SECRET_KEY,
   
  //--------------------------------------------
  //mysql database config
  //--------------------------------------------
  databaseHost: process.env.MYSQL_HOST,
  databaseName: process.env.DB_NAME,
  databaseUserName: process.env.MYSQL_USER,
  databasePassword: process.env.MYSQL_PASSWORD,
  mysqlPort:process.env.MYSQL_PORT,

};
