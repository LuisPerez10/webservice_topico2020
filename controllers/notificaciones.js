const { response } = require('express');
const axios = require('axios');
const Notificacion = require('../models/notificacion');

const notificar = async(uid, title, mensaje, value) => {
    const data = {
        "title": title,
        "mensaje": mensaje,
        "value": value,
    };
    const tokens = await getTokensFromUID(uid);
    pushnotificacion(data, tokens);
}

const pushnotificacion = async(data, to) => {

    const body = {
        "data": {
            "uid": "ABC",
            "click_action": "FLUTTER_NOTIFICATION_CLICK",
            "value": data.value,
            "id": "1"
        },
        "priority": "high",
        "notification": {
            "title": data.title,
            "body": data.body
        },
        "registration_ids": to
            // "to": 
    };

    axios({
            method: 'POST', // or 'PUT'
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                'Authorization': 'key=' + process.env.CM_AUTHORIZATION,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body),
        })
        .then(response => console.log('response Ok'))
        .catch((error) => {
            console.error('Error:', error);
        });
}
const borrarTokenFCMServices = async(req, res) => {
    const uid = req.uid;
    console.log(uid);
    const tokenFCM = req.body.tokenFCM;
    console.log([tokenFCM]);
    console.log('tokenFCM');
    console.log(tokenFCM);

    // const notificacion = Notificacion.findOne({ 'usuario': uid });
    try {

        // if (!notificacion) {
        console.log('find and delete token');
        await Notificacion.findOneAndUpdate({ 'usuario': uid }, { $pull: { tokens: tokenFCM } }, { new: true });
        // }

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
const guardarTokenFCMServices = async(req, res) => {
    const uid = req.uid;
    const tokenFCM = req.body.tokenFCM;
    console.log('tokenFCM');
    console.log([tokenFCM]);
    console.log('uid');
    console.log(uid);

    // await getTokensFromUID(uid);
    await notificar(uid, 'Titulo', 'Mensaje', 'value');

    const notificacion = await Notificacion.findOne({ 'usuario': uid });
    try {
        // console.log('notificacion');
        // console.log(notificacion);
        if (!notificacion) {
            console.log('nuevo creado');

            const nuevaNotificacion = new Notificacion({
                usuario: uid,
                tokens: [tokenFCM]
            });
            await nuevaNotificacion.save();
        } else {
            console.log('find and update');
            await Notificacion.findOneAndUpdate({ 'usuario': uid }, { $push: { tokens: tokenFCM } }, { new: true });
        }

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

// programar el get token from uid de otro, 
// testear en 2 telefonos, funciono con registratrion id
// TODO

const getTokensFromUID = async(uid) => {
    try {
        const notificacion = await Notificacion.findOne({ 'usuario': uid });
        return notificacion.tokens;
    } catch (error) {

    }

}

const guardarTokenFCMServices2 = async(req, res = response) => {

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



// const notificar = async() => {
//     const tokens = await getTokensFromUID(uid);
//     .exports
// }

module.exports = {
    notificar,
    guardarTokenFCMServices,
    borrarTokenFCMServices
}