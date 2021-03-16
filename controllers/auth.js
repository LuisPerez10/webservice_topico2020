const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB.uid);
        console.log(usuarioDB.id);
        const personaDB = await Persona.findOne({ 'usuario': usuarioDB.id });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        if (usuarioDB.estado == 'inhabilitado') {
            console.log('Usuario inhabilitado');
            return res.status(400).json({
                ok: false,
                msg: 'Usuario inhabilitado'
            });
        }



        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        console.log(usuarioDB);
        res.json({
            ok: true,
            token,
            // #added
            usuario: usuarioDB,
            persona: personaDB,

            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




const renewToken = async(req, res = response) => {

    const uid = req.uid;
    console.log(uid);
    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    try {
        const usuario = await Usuario.findById(uid);
        console.log(usuario);
        res.json({
            ok: true,
            token,
            usuario,
            menu: getMenuFrontEnd(usuario.role)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador usuario no valido'
        })
    }




}




module.exports = {
    login,
    renewToken
}