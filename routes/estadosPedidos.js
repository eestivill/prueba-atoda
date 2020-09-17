const express = require('express');
const EstadosPedidosService = require('../services/estadosPedidos');

const {
  idEstadoPedidoSchema,
  createEstadoPedidoSchema,
  updateEstadoPedidoSchema
} = require('../utils/schemas/estadosPedidos');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');
const { cache } = require('@hapi/joi');

function estadosPedidosApi(app) {
    const router = express.Router();
    app.use('/api/estadospedidos', router);
  
    const estadosPedidosService = new EstadosPedidosService();

    router.get('/', function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      try {
        estadosPedidosService.getEstadosPedidos(function(error, estadosPedidos) {
          res.status(200).json({
            data: estadosPedidos,
            message: 'Listados todos los EstadosPedidos'
          });
        });
      } catch(err) {
        next(err);
      }
    });

    router.get('/:IdEstadoPedido', validationHandler({ IdEstadoPedido: idEstadoPedidoSchema }, 'params'), function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      const idEstadoPedido = req.params.IdEstadoPedido;

      try {
        estadosPedidosService.getEstadoPedido(idEstadoPedido , function(error, estadoPedido) {
          if (typeof estadoPedido !== 'undefined' && estadoPedido.length > 0) {
            res.status(200).json({
              data: estadoPedido,
              message: 'Devuelto registro de EstadosPedidos'
            });  
          } else {
            res.status(404).json({
              data: idEstadoPedido,
              message: 'No existe el registro en EstadosPedidos'
            });
          }
        });
      } catch(err) {
        next(err);
      }
    });

    router.post('/',  validationHandler(createEstadoPedidoSchema), function(req, res, next) {
      const estadoPedido = {
          idEstadoPedido : req.body.IdEstadoPedido,
          nombre : req.body.Nombre,
          activo : req.body.Activo
      };

      try {
        estadosPedidosService.createEstadoPedido(estadoPedido, function(error, datos) {
          if (datos) {
            res.status(200).json({
              data: estadoPedido.idEstadoPedido,
              message: 'Insertado registro en EstadosPedidos'
            });
          } else {
            res.status(500).json({
              data: estadoPedido.idEstadoPedido,
              message: 'Error al insertar en EstadosPedidos'
            });
          }
        });
      } catch(err) {
        next(err);
      }
    });

    router.put('/:IdEstadoPedido', validationHandler({ IdEstadoPedido: idEstadoPedidoSchema }, 'params'), validationHandler(updateEstadoPedidoSchema), function(req, res, next) {
      const idEstadoPedido = req.params.IdEstadoPedido;
      const estadoPedido = {
        nombre : req.body.Nombre,
        activo : req.body.Activo
      };

      try {
        estadosPedidosService.updatePedido(idEstadoPedido, estadoPedido, function(error, estadoPedido) {
          res.status(200).json({
            data: idEstadoPedido,
            message: 'Modificado registro de EstadosPedidos'
          });
        });
      } catch(err) {
        next(err);
      }
    });

    router.delete('/:IdEstadoPedido', validationHandler({ IdEstadoPedido: idEstadoPedidoSchema }, 'params'), function(req, res, next) {
      const idEstadoPedido = req.params.IdEstadoPedido;
      
      try {
        estadosPedidosService.deleteEstadoPedido(idEstadoPedido , function(error, estadoPedido) {
          res.status(200).json({
            data: idEstadoPedido,
            message: "Borrado registro de EstadosPedidos"
          });
        });
      } catch(err) {
        next(err);
      }
    });

  }

module.exports = estadosPedidosApi;
