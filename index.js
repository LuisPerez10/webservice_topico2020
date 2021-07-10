require('dotenv').config();

const path = require('path');

const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express();

// configurar CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/upload', require('./routes/uploads'));

app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/notificacion', require('./routes/notificacion'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/trabajadorservicios', require('./routes/trabajadorServicios'));
app.use('/api/horarios', require('./routes/horarios'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});