var express = require('express'),
    actions = require('../actions/methods');

var router = express.Router();

router.post('/authenticate', actions.authenticate);
//router.post('/adduser', actions.addNew);
//router.get('/getinfo', actions.getinfo);
router.post('/examen', actions.Examen);
router.get('/preguntas2', actions.preguntas2);
router.get('/preguntas3', actions.preguntas3);
router.get('/areas', actions.areas);
router.get('/carreras', actions.carreras);
router.post('/gua_resultados', actions.gua_resultados);
router.post('/resultados', actions.resultados);
router.post('/intentos', actions.Intentos);

module.exports=router;