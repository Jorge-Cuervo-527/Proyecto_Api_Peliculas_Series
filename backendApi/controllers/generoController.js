const Genero = require('../app/models/generoModel');
const { validationResult } = require('express-validator');

// Función para listar todos los géneros (GET)
const getGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.send(generos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los géneros');
    }
};

// Función para crear un nuevo género (POST)
const createGenero = async (req, res) => {
    try {
        // Validamos si hay errores en la petición
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        // Creamos la instancia del modelo con los datos del cuerpo de la petición (req.body)
        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;


        // Guardamos en la base de datos
        genero = await genero.save();
        res.send(genero);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el género');
    }
};

// Función para actualizar un género existente (PUT)
const updateGenero = async (req, res) => {
    try {
        // 1. Validamos si hay errores en los datos enviados
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        // 2. Buscamos el género por el ID que viene en la URL (req.params.id)
        let genero = await Genero.findById(req.params.id);
        
        // Si no lo encuentra, devolvemos un error 404
        if (!genero) {
            return res.status(404).send('El género no existe');
        }

        // 3. Actualizamos los campos con los nuevos datos[cite: 2]
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
       
        // 4. Guardamos los cambios en la base de datos[cite: 2]
        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el género');
    }
};

// Función para consultar un solo género por su ID (GET por ID)
const getGeneroById = async (req, res) => {
    try {
        // Buscamos el género por el ID recibido en los parámetros de la URL
        const genero = await Genero.findById(req.params.id);
        
        // Si no existe un género con ese ID, devolvemos un 404 Not Found[cite: 2]
        if (!genero) {
            return res.status(404).send('El género no existe');
        }
        
        // Si lo encuentra, lo enviamos de vuelta al cliente[cite: 2]
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar el género');
    }
};

// Exportamos las funciones para usarlas en las rutas
module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    getGeneroById
};