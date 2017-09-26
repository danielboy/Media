var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tipo_examenSchema = new Schema({
  NOMBRE: {
    type: String,
    unique: true,
    required: true
  },
  CANT_REACTIVOS: {
    type: String,
    required: true
  },
  CANT_RESPUESTAS: {
    type: String,
    unique: true,
    required: true
  },
  TIEMPO: {
    type: Number,
    unique: false,
    required: false
  },
  CLAVE_REACTIVOS: {
    type: Number,
    unique: false,
    required: false
  }
});


module.exports = mongoose.model('Tipo_examen', Tipo_examenSchema);