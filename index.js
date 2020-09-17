
const express = require('express');
const app = express();

const { config } = require('./config/index');
const estadosPedidosApi = require('./routes/estadosPedidos.js');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware - Body parser
app.use(express.json());

// Routes
estadosPedidosApi(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch 404
app.use(notFoundHandler);

// Manejadores de errores del middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});
