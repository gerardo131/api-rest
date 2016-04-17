var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

//Con Mangoose, todo se deriva de un esquema. Vamos a obtener una referencia a él y definir Nuestros datos
var salamandraSchema = new Schema({  
  año:  Number,
  mes: Number,
  dia: Number,
  hora: String,
  url: String,
});

module.exports = mongoose.model('Salamandra', salamandraSchema);  
