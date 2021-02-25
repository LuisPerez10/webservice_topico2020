const { response } = require('express');

const Categoria = require('../models/categoria');

const getCategorias = async(req, res) => {
    // const uid = req.uid;

    const categorias = await Categoria.find();

    res.json({
        ok: true,
        categorias
    })
}

const crearCategoria = async(req, res) => {
    // const uid = req.uid;

    const categoria = new Categoria({
        ...req.body
    });

    try {
        await categoria.save();

        res.json({
            ok: true,
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })
    }
}

module.exports = {
    crearCategoria,
    getCategorias
}