const sinon = require('sinon');

const { estadosPedidosMock, filteredEstadosPedidosMock } = require('./estadosPedidos');

const getAllStub = sinon.stub();
getAllStub.withArgs('EstadosPedidos').returns(estadosPedidosMock);

const tagQuery = { tgas: { $in: ["Rhycero"] } };
getAllStub.withArgs('EstadosPedidos', tagQuery).resolves(filteredEstadosPedidosMock("Rhycero"));

const createStub = sinon.stub().resolves(estadosPedidosMock[0].IdEstadoPedido);

class MysqlLibMock {
    getAll = function(collection, callback) {
        callback(null, getAllStub(collection));
    }

    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MysqlLibMock
}
