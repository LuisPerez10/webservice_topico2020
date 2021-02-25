const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const Trabajador = require('../models/trabajador');



const verificarKeyUnica = async(req, res) => {
    const key = req.params.key;
    try {
        const existeKey = await Usuario.findOne({ 'email': key });
        if (existeKey) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }


        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        // Guardar usuario
        await usuario.save();
        const persona = new Persona({
            usuario: usuario.id,
            ...req.body
        });
        // Guardar persona

        await persona.save();

        const trabajador = new Trabajador({

            persona: persona.id,
            ...req.body
        });
        // Guardar trabajador
        await trabajador.save();
        // Generar el TOKEN - JWT
        // const token = await generarJWT(usuario.id);
        //YA NO CREA COLLECCION
        // await createCollection(usuario.id);
        res.json({
            ok: true,
            usuario,
            persona,
            trabajador
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

module.exports = {
    crearUsuario,
    verificarKeyUnica
}