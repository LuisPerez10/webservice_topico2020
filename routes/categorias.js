/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearCategoria, getCategorias } = require('../controllers/categorias');
const trabajador = require('../models/trabajador');

const router = Router();


// router.get( '/', validarJWT , getUsuarios );

router.post('/', [
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);

router.get('/', getCategorias);

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