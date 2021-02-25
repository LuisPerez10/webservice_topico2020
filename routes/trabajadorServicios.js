/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearTrabajadorServicio, borrarTrabajadorServicio, obtenerTrabajadorServicio } = require('../controllers/trabajador_servicios');


const router = Router();


// router.get( '/', validarJWT , getUsuarios );
router.get('/', obtenerTrabajadorServicio);
router.post('/:id', crearTrabajadorServicio);
router.delete('/:id', borrarTrabajadorServicio);


// router.get('/', getCategorias);



module.exports = router;