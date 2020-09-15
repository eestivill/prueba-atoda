const mysql = require('mysql');
const { config } = require("../config");

const DB_HOST = config.dbHost;
const DB_NAME = config.dbName;
const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);

class MySQLLib {
    constructor() {
        this.client = mysql.createConnection({
            host : DB_HOST,
            database : DB_NAME,
            user : DB_USER,
            password : DB_PASSWORD
        });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MySQLLib.connection) {
            MySQLLib.connection = new Promise((resolve, reject) => {               
                this.client.connect((err) => {
                  if (err) {
                    reject(err);
                  }
        
                  console.log("Conectado con exito a MySQL");
                  resolve(this.client.db);
                });
              });
        }

        return MySQLLib.connection;
    }

    end() {
        if (MySQLLib.connection) {
            this.client.end();
        }
    }
}

module.exports = MySQLLib;
