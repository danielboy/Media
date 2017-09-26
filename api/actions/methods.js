var Alumno = require('../models/alumno');
var Tipo_examen = require('../models/tipo_examen');
var Resultados = require('../models/resultados')
var preguntas2 = require('../models/preguntas2');
var preguntas3 = require('../models/preguntas3');
var areas = require('../models/areas');
var carreras = require('../models/carreras');
var jwt  = require('jwt-simple');
var config = require('../config/database');

var functions = {

// Login   0_0

 authenticate: function(req, res) {
    Alumno.findOne({ MATRICULA: req.body.matricula.toUpperCase()
    }, function(err, alumno){
      if (err) throw err;
      if(!alumno){
        //return res.status(403).send({success: false, msg: 'Authenticaton failed, alumno not found.'});
        return res.json({success: false, msg: 'Error de autenticación, matricula no encontrada.'});
      } else {
        alumno.comparePassword(req.body.curp.toUpperCase(), function(err, isMatch){
          if(isMatch && !err) {
            var datos = {
              _id: alumno._id,
              NOMBRE: alumno.NOMBRE,
              AP_PATERNO: alumno.AP_PATERNO,
              MATRICULA: alumno.MATRICULA,
              CURP: alumno.CURP,
              ESTADO: alumno.ESTADO,

            }
            var token = jwt.encode(datos, config.secret);
            console.log(alumno)
           return res.json({success: true, token: token, ID_ALUMNO: alumno._id, EXAMEN: alumno.EXAMEN, INTENTOS: alumno.INTENTOS, ESTADO: alumno.ESTADO});
            
          } else {
            return res.json({success: false, msg: 'Error de autenticación, curp o matricula incorrecta.'});
          }
        })
      }
    })
  },
      // Consulta Tipo Examen

      Examen: function(req, res){
        Tipo_examen.find({_id:req.body.id}, function(err, examen){
                                    console.log(req.body.id);
                                    if (err) throw err;
        
                                    if(!examen){
                                     // return res.status(403).send({success: false, msg: 'Authenticaton failed, alumno not found.'});
                                       return res.json({success: false, msg: 'No hay  Examen'});
                                       console.log('no hubo registro del tipo de examen')
                                    } 
                                    else {
                                      return res.json({success: true, examen});
                                    }
                                  })
                                },

// Guardar Resultados

  gua_resultados: function(req, res){
          var newresul = Resultados({
            Matricula: req.body.matricula,
            Estado: 1,
            Intentos: req.body.intentos,
            Area: req.body.area,
            Puntos: req.body.puntos,
            Fecha: req.body.fecha,       
          });

          newresul.save(function(err, newresul){
            if (err){
              console.log(err);
              res.json({success:false, msg:'Error al guardar'})
            }

            else {
              res.json({success:true, msg:'Guardado con éxito'});
            }
          })
      },

      // Consulta Resultados
  resultados: function(req, res){

             Resultados.find({Matricula: req.body.matricula}, function(err, resultados){
                            console.log();
                            if (err) throw err;

                            if(!resultados){
                             // return res.status(403).send({success: false, msg: 'Authenticaton failed, alumno not found.'});
                               return res.json({success: false, Intentos: 0, msg: 'No hay Intentos'});
                               console.log('no hubo registro')
                            } 
                            else {
                              return res.json({success: true, resultados});
                              console.log(resultados)
                            }
                          })
                        },

  Intentos: function(req, res){

             Resultados.distinct('Intentos',{Matricula: req.body.matricula}, function(err, intentos){
                            console.log(req.body.matricula);
                            if (err) throw err;

                            if(!intentos){
                             // return res.status(403).send({success: false, msg: 'Authenticaton failed, alumno not found.'});
                               return res.json({success: false, Intentos: 0, msg: 'No hay Intentos'});
                               console.log('no hubo registro')
                            } 
                            else {
                              return res.json({success: true, intentos});
                              console.log(resultados)
                            }
                          })
                        },                        


/*//  Actulizacion de informacion 

  putinfo: function(req, res){

      if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        var decodedtoken = jwt.decode(token, config.secret);
        var data =  {
              CS: req.body.CS,
              CSH: req.body.CSH,
              CEA:  req.body.CEA,
              CBAP: req.body.CBAP,
              CBI:  req.body.CBI
              };
              Alumno.update({_id:decodedtoken._id}, data, {}, function(err, data){
                if (err){
                  console.log(err);
                  res.json({success:false, msg:'Failed to save'})
                }

                else {
                  res.json({success:true, msg:'Successfully saved'});
                }
              })
            }
          },*/



      // Consulta Preguntas2
      preguntas2: function(req, res){
      preguntas2.find({}, function(err, preguntas2) {
                if (err){
                  console.log(err);
                  res.json({success:false, msg:'Hola no sirve'})
                }

                else {
                  res.json({success:true, msg:'HOla 2', preguntas2});
                }
        console.log(preguntas2);
      });
      },

     // Consulta Preguntas3
      preguntas3: function(req, res){
      preguntas3.find({}, function(err, preguntas3) {
                if (err){
                  console.log(err);
                  res.json({success:false, msg:'Hola no sirve'})
                }

                else {
                  res.json({success:true, msg:'HOla 3', preguntas3});
                }
        console.log(preguntas3);
      });
      },

     // Consulta areas
      areas: function(req, res){
      areas.find({}, function(err, areas) {
                if (err){
                  console.log(err);
                  res.json({success:false, msg:'Hola no sirve'})
                }

                else {
                  res.json({success:true, msg:'HOla', areas});
                  console.log(areas)
                }
        console.log(areas);
      });
      },

           // Consulta carreras
      carreras: function(req, res){
      carreras.find({}, function(err, carreras) {
                if (err){
                  console.log(err);
                  res.json({success:false, msg:'Hola no sirve'})
                }

                else {
                  res.json({success:true, msg:'HOla', carreras});
                }
        console.log(carreras);
      });
      }

              };


module.exports = functions;
