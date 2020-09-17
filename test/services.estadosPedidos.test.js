const assert = require('assert');
const proxyquire = require('proxyquire');

const { MysqlLibMock, getAllStub } = require('../utils/mocks/mysqlLib');

const { estadosPedidosMock } = require('../utils/mocks/estadosPedidos');

describe("servicies - EstadosPedidos", function() {

    const EstadosPedidosServices = proxyquire('../services/estadosPedidos', {
       '../lib/mysql': MysqlLibMock 
    });

    const estadosPedidosService = new EstadosPedidosServices();

    describe("when getEstadosPedidos method is called", function() {
        it('should call the getAll MysqlLib method', function() {
            estadosPedidosService.getEstadosPedidos(function(error, result) {});
            assert.strictEqual(getAllStub.called, true);
        });

        it('should return an array of EstadosPedidos', function() {
            var result = [];
            estadosPedidosService.getEstadosPedidos(function(error, estadosPedidos) {
                result = estadosPedidos;
            });
            const expected = estadosPedidosMock;
            assert.deepStrictEqual(result, expected);
        });
    })
})
