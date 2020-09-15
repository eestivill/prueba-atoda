
const express = require('express');
const app = express();

const { config } = require('./config/index');
const estadosPedidosApi = require('./routes/estadosPedidos.js');

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

// Middleware - Body parser
app.use(express.json());

// Routes
estadosPedidosApi(app);

/*
var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'atodaco_beta',
    user : 'atodaco_beta',
    password : 'atodaco_beta',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.query('SELECT * FROM estadospedidos', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

conexion.end();
*/