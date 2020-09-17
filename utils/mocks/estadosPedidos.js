const estadosPedidos = require("../schemas/estadosPedidos");

const estadosPedidosMock =  [{
    "IdEstadoPedido": "JZKM",
    "Nombre": "Gabtune",
    "Activo": 1
  }, {
    "IdEstadoPedido": "TXQS",
    "Nombre": "Oodoo",
    "Activo": 1
  }, {
    "IdEstadoPedido": "LRYB",
    "Nombre": "Voonyx",
    "Activo": 1
  }];

  
  function filteredEstadosPedidosMock(tag) {
    return estadosPedidosMock.filter(estadoPedido => estadoPedido.Nombre.includes(tag));
  }

  class EstadosPedidosServiceMock {

    getEstadosPedidos = function(callback) {
      callback(null, estadosPedidosMock);
    }

    createEstadoPedido() {
      return estadosPedidosMock[0];
    }
  }

  module.exports = {
      estadosPedidosMock,
      filteredEstadosPedidosMock,
      EstadosPedidosServiceMock
  };
  