'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log('App rodando na porta: '+port);
});
const io = require('socket.io')(server);


const usuarioRouter = require('./routes/usuarioRouter');
const utilRouter = require('./routes/utilRouter');
const clienteRouter = require('./routes/clienteRouter');
const atendimentoRounter = require('./routes/atendimentoRouter');
const errorHandlingRouter = require('./routes/errorHandlingRouter');
const tipoAtendimentoRouter = require('./routes/tipoAtendimentoRouter');
const graficoRouter = require('./routes/graficoRouter');
const graficoFaturamentoRouter = require('./routes/graficoFaturamentoRouter');
const faturamentoRouter = require('./routes/faturamentoRouter');
const middleware = require('./middleware/authentication');
const socketChart = require("./websocket/graficos")(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middleware router created to protect rest api with token 
 * based authentication
 */
app.use('/',middleware);

/**
 * Add other routers
 */
app.use('/',clienteRouter);
app.use('/',utilRouter);
app.use('/', usuarioRouter);
app.use('/',atendimentoRounter);
app.use('/',tipoAtendimentoRouter);
app.use('/',graficoRouter);
app.use('/',graficoFaturamentoRouter);
app.use('/',faturamentoRouter);
app.use(errorHandlingRouter);




// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/
module.exports = app;
