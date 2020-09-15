//const mySQLLibPool = require('../lib/mysqlPool');
const mySQLLib = require('../lib/mysql');

class EstadosPedidosService {
    constructor() {
        this.mySQLDB = new mySQLLib();
    }

    getEstadosPedidos = function(callback)
    {
        this.mySQLDB.client.query('SELECT * FROM EstadosPedidos WHERE Activo', function(error, estadosPedidos) {
			if (error) {
				throw error;
			} else {
                //console.log("estadosPedidos: ", estadosPedidos);
				callback(null, estadosPedidos);
			}
		});
	}

    getEstadoPedido = function(idEstadoPedido, callback)
    {
        const sql = 'SELECT * FROM EstadosPedidos WHERE IdEstadoPedido = ' + this.mySQLDB.client.escape(idEstadoPedido);

        this.mySQLDB.client.query(sql, function(error, estadoPedido) {
			if (error) {
				throw error;
			} else {
                //console.log("estadoPedido: ", estadoPedido);
				callback(null, estadoPedido);
			}
		});
    }

    createEstadoPedido(estadoPedido, callback) {
        this.mySQLDB.client.query('INSERT INTO EstadosPedidos SET ?', estadoPedido, function(err, result) {
			if (err) {
				throw err;
			} else {
                console.log("result", result);
				callback(null, result.affectedRows);
			}
		});
    }

    updatePedido(idEstadoPedido, estadoPedido, callback) {
        const sql = 'UPDATE EstadosPedidos SET ? ' + connection.escape(estadoPedido)  +' WHERE id = ' + idEstadoPedido;

        this.mySQLDB.client.query(sql, function(error, estadoPedido) {
            if (error) {
                throw error;
            } else {
                callback(null,{"message":"Modificado"});
			}
		});
    }

    deleteEstadoPedido(idEstadoPedido, callback) {
        const sql = 'DELETE FROM EstadosPedidos WHERE IdEstadoPedido = ' + this.mySQLDB.client.escape(idEstadoPedido);

        this.mySQLDB.client.query(sql, function(error, estadoPedido) {
            if (error) {
                throw error;
            } else {
                callback(null,{"mensaje":"Borrado"});
			}
		});
    }
}

module.exports = EstadosPedidosService;
