const mySQLLib = require('../lib/mysql');

class EstadosPedidosService {
    constructor() {
        this.collection = 'EstadosPedidos';
        this.mySQLDB = new mySQLLib();
    }

    getEstadosPedidos = function(callback) {
        this.mySQLDB.sql = 'SELECT * FROM EstadosPedidos WHERE Activo = 1';

        this.mySQLDB.getAll(this.collection, function(error, estadosPedidos) {
            if (error) {
				throw error;
			} else {
                callback(null, estadosPedidos);
			}
		});
	}

    getEstadoPedido = function(idEstadoPedido, callback) {
        this.mySQLDB.sql = "SELECT * FROM EstadosPedidos WHERE IdEstadoPedido = " + this.mySQLDB.client.escape(idEstadoPedido);

        this.mySQLDB.get(this.collection, function(error, estadoPedido) {
			if (error) {
				throw error;
			} else {
                callback(null, estadoPedido);
			}
		});
    }

    createEstadoPedido(estadoPedido, callback) {
        this.mySQLDB.sql = "INSERT INTO EstadosPedidos SET ? ";
        this.mySQLDB.data = estadoPedido;

        this.mySQLDB.create(this.collection, function(error, result) {
			if (error) {
				throw error;
			} else {
                callback(null, result.affectedRows);
			}
		});
    }

    updatePedido(idEstadoPedido, estadoPedido, callback) {
        this.mySQLDB.sql = "UPDATE EstadosPedidos SET " + this.mySQLDB.client.escape(estadoPedido)  + " WHERE IdEstadoPedido = '" + idEstadoPedido + "'";

        this.mySQLDB.update(function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.affectedRows);
			}
		});
    }

    deleteEstadoPedido(idEstadoPedido, callback) {
        this.mySQLDB.sql = "DELETE FROM EstadosPedidos WHERE IdEstadoPedido = '" + idEstadoPedido + "'";

        this.mySQLDB.delete(function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.affectedRows);
			}
		});
    }
}

module.exports = EstadosPedidosService;
