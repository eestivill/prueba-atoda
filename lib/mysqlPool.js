const mysql = require('mysql');
const { config } = require("../config");

const configDB = {
    host: 'localhost',//config.dbHost,
    database: 'atodaco_beta', //config.dbName,
    user: 'atodaco_beta', //config.dbUser,
    password: 'atodaco_beta' //config.dbPassword
};

//const mysqlPool = mysql.createPool(config);
const mysqlPool = mysql.createConnection(config);

mysqlPool.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

module.exports = mysqlPool;
