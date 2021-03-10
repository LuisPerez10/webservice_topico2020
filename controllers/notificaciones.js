const { response } = require('express');

// const Categoria = require('../models/categoria');
const Notificacion = require('../models/notificacion');

const getCategorias = async(req, res) => {
    // const uid = req.uid;

    const categorias = await Categoria.find();

    res.json({
        ok: true,
        categorias
    })
}

const guardarTokenFCMServices = async(req, res) => {
    const uid = req.uid;

    const notificacion = new notificacion({
        ...req.body
    });

    try {
        await categoria.save();

        res.json({
            ok: true,
            // categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })
    }
}
const guardarTokenFCMServices = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const estudio = await Estudio.findById(id);

        if (!estudio) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudio no encontrado por id',
            });
        }

        const cambiosEstudio = {
            ...req.body,
            usuario: uid
        }

        const estudioActualizado = await Estudio.findByIdAndUpdate(id, cambiosEstudio, { new: true });


        res.json({
            ok: true,
            estudio: estudioActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    guardarTokenFCMServices,
    getCategorias
}