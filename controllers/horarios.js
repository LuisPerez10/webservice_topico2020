const { response } = require('express');

const Horario = require('../models/horario');

const getHorarios = async(req, res) => {
    // const uid = req.uid;

    const horarios = await Horario.find();

    res.json({
        ok: true,
        horarios
    })
}


module.exports = {
    getHorarios
}