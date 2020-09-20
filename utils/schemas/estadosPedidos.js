const joi = require('@hapi/joi');

const idEstadoPedidoSchema = joi.number().min(1).max(9999);
const nombreSchema = joi.string().max(50);
const activoSchema = joi.number().min(0).max(1);

const createEstadoPedidoSchema = {
    IdEstadoPedido: idEstadoPedidoSchema.required(),
    Nombre: nombreSchema.required(),
    Activo: activoSchema.required()
}

const updateEstadoPedidoSchema = {
    Nombre: nombreSchema.required(),
    Activo: activoSchema.required()
}

module.exports = {
    idEstadoPedidoSchema,
    createEstadoPedidoSchema,
    updateEstadoPedidoSchema
};
