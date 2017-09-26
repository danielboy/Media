var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlumnoSchema = new Schema({
  NOMBRE: {
    type: String,
    unique: true,
    required: true
  },
  CURP: {
    type: String,
    required: true
  },
  AP_PATERNO: {
    type: String,
    unique: true,
    required: true
  },  
  AP_MATERNO: {
    type: String,
    unique: true,
    required: true
  },
  MATRICULA: {
    type: String,
    unique: true,
    required: true
  },
  UNIDAD_ACADEMICA: {
    type: String,
    unique: true,
    required: true
  },
  TURNO: {
    type: String,
    unique: true,
    required: true
  },
  GRADO: {
    type: String,
    unique: true,
    required: true
  },
  GRUPO: {
    type: String,
    unique: true,
    required: true
  },  
  ESTADO: {
    type: Number,
    unique: false,
    required: true
  },
  EXAMEN: {
    type: Array,
    unique: false,
    required: true
  },
  INTENTOS: {
    type: Number,
    unique: false,
    required: true
  },
});



AlumnoSchema.methods.comparePassword = function (passw, cb) {
    if (passw == this.CURP) {
      return cb(null, true);
    } else {
      return cb("contraseña incorrecta");
    }
};

module.exports = mongoose.model('Alumno', AlumnoSchema);