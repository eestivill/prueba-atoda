const express = require('express');
const EstadosPedidosService = require('../services/estadosPedidos');

function estadosPedidosApi(app) {
    const router = express.Router();
    app.use('/api/estadospedidos', router);
  
    const estadosPedidosService = new EstadosPedidosService();

    router.get('/', function(req, res, next) {
      try {
        estadosPedidosService.getEstadosPedidos(function(error, estadosPedidos)
        {
          res.status(200).json({
            data: estadosPedidos,
            message: 'EstadosPedidos listados'
          });
        });
      } catch(err) {
        next(err);
      }
    });

    router.get('/:IdEstadoPedido', function(req, res, next) {
      const idEstadoPedido = req.params.IdEstadoPedido;

      try {
        estadosPedidosService.getEstadoPedido(idEstadoPedido , function(error, estadoPedido) {
          if (typeof estadoPedido !== 'undefined' && estadoPedido.length > 0) {
            //console.log('success', estadoPedido);
            res.status(200).json({
              data: estadoPedido,
              message: 'EstadoPedido listado'
            });  
          } else {
            response.status(404).json({"message":"No existe el EstadoPedido"});
          }
        });
      } catch(err) {
        //console.log('err', err);
        next(err);
      }
    });

    router.post('/', function(req, res, next) {
      const estadoPedido = {
          idEstadoPedido : req.body.IdEstadoPedido,
          nombre : req.body.Nombre,
          activo : req.body.Activo
      };

      try {
        estadosPedidosService.createEstadoPedido(estadoPedido, function(error, datos) {
          if (datos) {
            res.status(200).json({"message":"EstadoPedido insertado"});
          } else {
            res.status(500).json({"message":"Error al insertar EstadoPedido"});
          }
        });
      } catch(err) {
        next(err);
      }
    });

    router.put('/:IdEstadoPedido', function(req, res, next) {
      const idEstadoPedido = req.params.IdEstadoPedido;
      const estadoPedido = {
        nombre : req.body.Nombre,
        activo : req.body.Activo
      };

      try {
        estadosPedidosService.updatePedido(idEstadoPedido, estadoPedido, function(error, estadoPedido) {
          res.status(200).json({"message":"EstadoPedido modificado"});
        });
      } catch(err) {
        next(err);
      }
    });

    router.delete('/:IdEstadoPedido', function(req, res, next) {
      const idEstadoPedido = req.params.IdEstadoPedido;
      
      try {
        estadosPedidosService.deleteEstadoPedido(idEstadoPedido , function(error, estadoPedido) {
          res.status(200).json({"message":"EstadoPedido borrado"});
        });
      } catch(err) {
        next(err);
      }
    });

  }

module.exports = estadosPedidosApi;
