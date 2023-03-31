//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importamos la conexion a la db y creación de la función para la conexión a la BBDD
const { connect } = require('./utils/connect.js');

// Express APIs
const user = require('./routes/user.routes');
const products = require('./routes/product.routes');

//Ejecutamos la funcion que conecta con la db
connect();

// Configuración de express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//Ruta al HTML. Útil para desplegar en Vercel
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/api");
// });

// Aquí indicamos las rutas a usar
app.use('/public', express.static('public'));

app.use('/api', user)
app.use('/api', products)

// Definimos el puerto desde el dotenv y si no lo hubiera el 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Manejamos los errores
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});