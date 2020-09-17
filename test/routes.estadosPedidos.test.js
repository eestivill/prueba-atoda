const assert = require('assert');
const proxyquire = require('proxyquire');
const { requests } = require('sinon');

const { estadosPedidosMock, EstadosPedidosServiceMock } = require('../utils/mocks/estadosPedidos');
const testServer = require('../utils/testServer');

describe('routes - EstadosPedidos', function() {
    const route = proxyquire('../routes/estadosPedidos', {
        '../services/estadosPedidos': EstadosPedidosServiceMock
    });

    const request = testServer(route);

    describe('GET /estadospedidos', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/estadospedidos').expect(200, done);
        });

        it('should respond with the list of estadosPedidos', function(done) {
            request.get('/api/estadospedidos').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: estadosPedidosMock,
                    message: 'Listados todos los EstadosPedidos'
                });

                done();
            });
        });
    }); 
});