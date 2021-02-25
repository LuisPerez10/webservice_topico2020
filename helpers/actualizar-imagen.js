const Usuario = require('../models/usuario');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            if (usuario.img) {
                pathViejo = `./uploads/usuarios/${ usuario.img }`;
                borrarImagen(pathViejo);
            }
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        default:
            return true;
    }


}



module.exports = {
    actualizarImagen
}