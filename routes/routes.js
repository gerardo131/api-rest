module.exports = function(app){
	var Salamandra = require('../models/salamandra.js');
	var mongoose = require('mongoose');

	//GET 
	//la siguiente forma es propia de mongoose
	var finAllSalamandra = function(req, res){
		Salamandra.find(function(err, salamandra){
			//res.send es una funcion de express
			if(!err) res.send(salamandra);
			else console.log('ERROR:' +err);
		});
	};

	//GET SOLO POR ID
	var findByID = function(req,res){
		Salamandra.findById(req.param.id, function(err, salamandra){
			if(!err) req.send(salamandra); //si no hubo error busca en la base de datos
			else console.log('ERROR' +err);
		});
	};

	//POST
	var addSalamandra = function(req,res){
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
	var updateSalamandra = function(req, res){
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
	var deleteSalamandra = function(req, res){
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