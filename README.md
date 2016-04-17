# api-rest

##Instalando NodeJS Y MongoDB

**Primero que nada, instalamos nodejs. Para Ubuntu ocupe la versión 4.4.3 copiamos lo siguiente:**

```sh
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Para otras versiones o distribuciones, puedes ir a la [pagina oficial](https://nodejs.org/en/download/package-manager/).

**Ahora instalamos MongoDB**

1. Ejecuta el siguiente comando para importar la clave pública GPG MongoDB:
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

2. Crear un archivo de lista de MongoDB:
```sh
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

3. Recargar los paquetes locales
```sh
$ sudo apt-get update
```

4. Instalaremos la última versión de MongoDB:
```sh
$ sudo apt-get install -y mongodb-org
```

Para mas informacion y otras distribuciones/versiones de  [MongoDB](https://docs.mongodb.org/manual/installation/).

##Package.json
En este archivo lo que haremos será instalar las dependencias de nuestra api-rest, que es el primer código usado, también hay otras maneras de instalar estas dependencias. Por el momento esta se me ha hecho la mas comoda.

Por lo tanto package.json tendrá:
```json
{
 "name": "node-api-rest",
 "version": "0.0.1",
 "dependencies": {
 "mongoose": "~4.4.12",
 "express": "^4.7.1",
 "method-override": "^2.3.5",
 "body-parser": "^1.15.0"
 }
}
```

Ahora las instalamos con:
```sh
$ npm install
```
**Ojo**: debemos estar dentro de nuestra carpeta del proyecto

* Mongoose es la librería que nos va ayudar a conectar con mongoDB
* Express nos va a ayudar a implementar los métodos de ruta HTTP: GET, POST, etc.
* Method-override va hacer la llamada para enviar una solicitud POST a una URL con el método reemplazado como el valor de esa clave cadena de consulta. Este método de utilizar un valor de la consulta normalmente se utiliza en conjunción con llanura HTML <form> elementos cuando se trata de apoyar navegadores antiguos pero todavía utilizar métodos más nuevos.
* body-parser permitimos que se pueda parsear JSON, analizando ya sea función o cadena.

##Hola Mundo!

Para la creación de nuestro "hola Mundo" vamos hacer un archivo en la raíz de nuestro proyecto con el nombre de app.js y llevará el siguiente código:

```js
var express = require('express');
var app = express(); //app es una instancia de express.
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');

//analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));  
// analizar application/json
app.use(bodyParser.json());
// override con POST teniendo ?_method=DELETE
app.use(methodOverride());

// responda con un "hola mundo" cuando una solicitud GET se hace a la página de inicio
app.get('/', function(req, res) {
  res.send('hola Mundo');
});

//correr el servidor en el puerto 3000
app.listen(3000, function () {
  console.log('El servidor esta corriendo en http://localhost:3000');
});
```

**corriendo Hola Mundo**

Escribe en consola:
```sh
$ node app.js
```
Si todo salió como debe ser, entonces abre tu navegador en la ruta [http://localhost:3000](http://localhost:3000).

##Creando los modelos de la DB

Como explicamos anteriormente usaremos [Mongoose](http://mongoosejs.com/index.html) para guardar información en la DB. MongoDB es una base de datos Open Source NoSQL orientada a documentos tipo JSON.

Vamos a crear una base de datos donde guardemos urls, vamos a crear el modelo (models/salamandra.js), de la siguiente manera:
```js
var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

//Con Mangoose, todo se deriva de un esquema. Vamos a obtener una referencia a él y definir Nuestros datos
var salamandraSchema = new Schema({  
  año: Number,
  mes: Number,
  dia: Number,
  hora: String,
  url: String,
});

module.exports = mongoose.model('Salamandra', salamandraSchema);  
```

Por lo que ahora tendremos que agregar las siguientes lineas en nuestro app.js:

```js
// Devolución de llamada opcional que se activa cuando se ha completado la conexión inicial
var uri = 'mongodb://localhost/salamandra';

mongoose.connect(uri, function(err, res){
	if(err) throw err;
    else console.log('Conexión realizada');
});
```
**Aun no se ha agregado nada a nuestra base de datos, solo hemos hecho el esquema para definir como va a recibir los parametros**

##Implementado metodos HTTP
crearemos una routes de la siguiente mandera (routes/routes.js) en este archivo tendremos todos los metodos de manera global:
```js
module.exports = function(app){
	var Salamandra = require('../models/salamandra.js');
	var mongoose = require('mongoose');

	//GET 
	//la siguiente forma es propia de mongoose
	finAllSalamandra = function(req, res){
		Salamandra.find(function(err, salamandra){
			//res.send es una funcion de express
			if(!err) res.send(salamandra);
			else console.log('ERROR:' +err);
		});
	};

	//GET SOLO POR ID
	findByID = function(req,res){
		Salamandra.findById(req.param.id, function(err, salamandra){
			if(!err) req.send(salamandra); //si no hubo error busca en la base de datos
			else console.log('ERROR' +err);
		});
	};

	//POST
	addSalamandra = function(req,res){
		console.log('POST');
		console.log(req.body);

		var salamandra = new Salamandra({
			año: req.body.año,
  			mes: req.body.mes,
  			dia: req.body.dia,
  			hora: req.body.hora,
  			url: req.body.url
		});

		salamandra.save(function(err){
			if(!err) console.log('Salamandra ha sido Guardada');
			else console.log('ERROR:' +err);
		});
		
		res.send(salamandra);
	}

	//PUT 
	updateSalamandra = function(req, res){
		Salamandra.findById(req.params.id, function(err, salamandra){
			salamandra.año = req.body.año;
			salamandra.mes = req.body.mes;
			salamandra.dia = req.body.mes;
			salamandra.hora = req.body.hora;
			salamandra.url = req.body.url;
		});

		salamandra.save(function(err){
			if(!err) console.log('Salamandra Actualizada');
			else console.log('ERROR:' +err);
		});
	};

	// Delete
	deleteSalamandra = function(req, res){
		Salamandra.findById(req.params.id, function(err, salamandra){
			salamandra.remove(function(err) {
  				if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			})
		});
	}

	//ROUTES
	app.get('/salamandra', finAllSalamandra);
	app.get('/salamandra/:id', findByID);
	app.post('/salamandra', addSalamandra);
	app.put('/salamandra/:id', updateSalamandra);
	app.delete('/salamandra/:id', deleteSalamandra);
}
```
Para asegurarnos de que el codigo esta bien, solo basta con poner en la colsola:
```sh
$ node app.js
```
**Podemos hacer uso de nuestra api-rest con POSTMAN o con cualquier otro plugin para nuestro navegador preferido**
