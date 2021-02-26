const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearServicio, obtenerServiciosPorIdCategoria } = require('../controllers/servicios');


const router = Router();



router.post('/:id', [
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearServicio
);

router.get('/:id', obtenerServiciosPorIdCategoria);




module.exports = router;