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
        this.sql = new String();
        this.data = new Object();
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

    getAll = function(collection, callback) {
        this.client.query(this.sql, function(error, estadosPedidos) {
            if (error) {
                throw error;
            } else {
                callback(null, estadosPedidos);
            }
        });    
    }

    get = function(collection, callback) {
        this.client.query(this.sql, function(error, estadoPedido) {
            if (error) {
                throw error;
            } else {
                callback(null, estadoPedido);
            }
        });    
    }
    create = function(collection, callback) {
        this.client.query(this.sql, this.data, function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result);
            }
        });
    }

    update = function(callback) {
        this.client.query(this.sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result);
            }
        });
    }

    delete = function(callback) {
        this.client.query(this.sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result);
            }
        });    
    }

}

module.exports = MySQLLib;
