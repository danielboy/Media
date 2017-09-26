var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var resultadosSchema = new Schema({
    Matricula: {
    type: String,
  },
    Intentos: {
    type: Number,
  },
    Area: {
    type: String,
  },
    Puntos: {
    type: Number,
  },
    Estado: {
    type: Number,
  },
    Fecha: {
    type: String,
  },
});

module.exports = mongoose.model('resultados', resultadosSchema);