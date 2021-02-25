/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');

const { getHorarios } = require('../controllers/horarios');

const router = Router();



router.get('/', getHorarios);


module.exports = router;