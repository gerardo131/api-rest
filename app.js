var express = require('express');
var app = express(); //app es una instancia de express.
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var router = express.Router();

//analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));  
// analizar application/json
app.use(bodyParser.json()); 
// override con POST teniendo ?_method=DELETE
app.use(methodOverride());

// responda con un "hola mundo" cuando una solicitud GET se hace a la página de inicio
app.get('/', function(req, res) {
  res.send('hello world');
});

routes = require('./routes/routes')(app);

//correr el servidor en el puerto 3000
app.listen(3000, function () {
  console.log('El servidor esta corriendo en http://localhost:3000');
});

// Devolución de llamada opcional que se activa cuando se ha completado la conexión inicial
var uri = 'mongodb://localhost/salamandra';

mongoose.connect(uri, function(err, res){
	if(err) throw err;
    else console.log('Conexión realizada');
});

