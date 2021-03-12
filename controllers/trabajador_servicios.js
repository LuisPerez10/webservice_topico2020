const TrabajadorServicio = require('../models/trabajador_servicios');
const Horario = require('../models/horario');
const { findByIdAndUpdate, findByIdAndRemove, where } = require('../models/trabajador_servicios');


const crearTrabajadorServicio = async(req, res) => {
    console.log('req.body');
    console.log(req.body);
    const serviciosList = req.body.serviciosList;
    console.log(serviciosList);
    const trabajador = req.params.id;
    var trabajadorServicios = [];

    try {
        for (let i = 0; i < serviciosList.length; i++) {
            console.log(serviciosList[i]);
            const servicioId = serviciosList[i].servicio;
            const trabajadorServicio = new TrabajadorServicio({
                trabajador,
                servicio: servicioId,
                horarios: serviciosList[i].horarios,
                dias: serviciosList[i].dias,
            });

            console.log('antes Save');
            await trabajadorServicio.save();
            console.log('Despues Save');
            trabajadorServicios.push(trabajadorServicio);
        }

        res.json({
            ok: true,
            trabajadorServicios
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el Adm'
        });
    }

}
const obtenerTrabajadorServicio = async(req, res) => {
    // const uid = req.uid;

    const trabajadorServicios = await TrabajadorServicio.find();

    res.json({
        ok: true,
        trabajadorServicios
    })
}


// const crearTrabajadorServicio = async(req, res) => {
//     console.log(req.body);
//     const serviciosList = req.body.serviciosList;
//     const trabajador = req.params.id;
//     var trabajadorServicios = [];

//     try {
//         for (let i = 0; i < serviciosList.length; i++) {
//             const servicioId = serviciosList[i]._id;
//             const trabajadorServicio = new TrabajadorServicio({
//                 trabajador,
//                 servicio: servicioId
//             });

//             await trabajadorServicio.save();

//             let horarios = trabajadorServicio[i].horario;
//             let horariosId = [];

//             for (let j = 0; j < horarios.length; j++) {
//                 const horario = new Horario({
//                     trabajadorServicio: trabajadorServicio.id,
//                     ...horarios[j]
//                 });

//                 await horario.save();
//                 horariosId.push(horario.id);
//                 // await trabajadorServicio.update(trabajadorServicio.id, { 'horarios': horariosId });
//             }
//             const auxTS = await TrabajadorServicio.findByIdAndUpdate(trabajadorServicio.id, { 'horarios': horariosId });
//             trabajadorServicios.push(auxTS);
//         }

//         res.json({
//             ok: true,
//             trabajadorServicios
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             msg: 'Comunicate con el Adm'
//         });
//     }

// }
const borrarTrabajadorServicio = async(req, res) => {
    const trabajadorServicioId = req.params.id;

    try {
        await Promise.all([
            Horario.deleteMany({ 'trabajadorServicio': trabajadorServicioId }),
            TrabajadorServicio.findByIdAndDelete(trabajadorServicioId)
        ]).then(() => {
            console.log('ok');
        });

        res.json({
            ok: true,
            msg: "Servicio del trabajador fue eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el Adm'
        });
    }

}

module.exports = {
    crearTrabajadorServicio,
    borrarTrabajadorServicio,
    obtenerTrabajadorServicio
}