const { response } = require('express');

const Servicio = require('../models/servicio');

const obtenerServiciosPorIdCategoria = async(req, res) => {
    const categoiraId = req.params.id;
    const servicios = await Servicio.find({ 'categoria': categoiraId });

    res.json({
        ok: true,
        servicios
    })
}

const crearServicio = async(req, res) => {

    const categoiraId = req.params.id;

    const servicio = new Servicio({
        categoria: categoiraId,
        ...req.body
    });

    try {
        await servicio.save();

        res.json({
            ok: true,
            servicio
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
    crearServicio,
    obtenerServiciosPorIdCategoria
}