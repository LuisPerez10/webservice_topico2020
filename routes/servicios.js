/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearServicio, obtenerServiciosPorIdCategoria } = require('../controllers/servicios');


const router = Router();


// router.get( '/', validarJWT , getUsuarios );

router.post('/:id', [
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearServicio
);

router.get('/:id', obtenerServiciosPorIdCategoria);

// testear
// subir archiv

// registrar trabajador servicio

// servicios, caterogiras
// router.put( '/:id',

//     [
//         validarJWT,
//         varlidarADMIN_ROLE_o_MismoUsuario,
//         check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//         check('email', 'El email es obligatorio').isEmail(),
//         check('role', 'El role es obligatorio').not().isEmpty(),
//         validarCampos,
//     ],
//     actualizarUsuario
// );

// router.delete( '/:id',
//     [ validarJWT, varlidarADMIN_ROLE ],
//     borrarUsuario
// );



module.exports = router;