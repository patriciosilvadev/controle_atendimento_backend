'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var app = express();
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
  console.log('App rodando na porta: '+port);
});
var io = require('socket.io')(server);


var usuarioRouter = require('./routes/usuarioRouter');
var clienteRouter = require('./routes/clienteRouter');
var atendimentoRounter = require('./routes/atendimentoRouter');
var errorHandlingRouter = require('./routes/errorHandlingRouter');
var tipoAtendimentoRouter = require('./routes/tipoAtendimentoRouter');
var graficoRouter = require('./routes/graficoRouter');
var graficoFaturamentoRouter = require('./routes/graficoFaturamentoRouter');
var faturamentoRouter = require('./routes/faturamentoRouter');
var middleware = require('./middleware/authentication');
var socketChart = require("./websocket/graficos")(io);

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
app.use('/', usuarioRouter);
app.use('/',atendimentoRounter);
app.use('/',tipoAtendimentoRouter);
app.use('/',graficoRouter);
app.use('/',graficoFaturamentoRouter);
app.use('/',faturamentoRouter);
app.use(errorHandlingRouter);




// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
