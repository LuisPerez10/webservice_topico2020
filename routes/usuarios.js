/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, verificarKeyUnica, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');


const router = Router();


// router.get( '/', validarJWT , getUsuarios );

router.get('/:key', verificarKeyUnica);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('celular', 'El Numero de celular es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.post('/test', (req, res = response) => res.json({
    ok: true
}))

// testear
// subir archiv

// registrar trabajador servicio

// servicios, caterogiras

router.get('/',
    validarJWT,
    getUsuarios
);


router.put('/:id', [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

// router.delete( '/:id',
//     [ validarJWT, varlidarADMIN_ROLE ],
//     borrarUsuario
// );



module.exports = router;