

ar express = require('express');
var app = express(); //app es una instancia de express.
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var router = express.Router();
const env = process.env;

//analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));  
// analizar application/json
app.use(bodyParser.json()); 
// override con POST teniendo ?_method=DELETE
app.use(methodOverride());

// responda con un "hola mundo" cuando una solicitud GET se hace a la página de inicio
app.get('/', function(req, res) {
  res.send('¡Hola mundo!');
});

var routes = require('./routes/routes')(app);

//correr el servidor en el puerto 3000
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});

// Devolución de llamada opcional que se activa cuando se ha completado la conexión inicial
var connection_string = '127.0.0.1:27017/salamandra';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connection_string, function(err, res){
  if(err) throw err;
    else console.log('Conexión realizada');
});
