const Director = require('../app/models/directorModel');
const { validationResult } = require('express-validator');

// Listar todos los directores (GET)
const getDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los directores');
    }
};

// Obtener un director por ID (GET)
const getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).send('El director no existe');
        }
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar el director');
    }
};

// Crear un director (POST)
const createDirector = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = new Director();
        director.nombres = req.body.nombres;
        director.estado = req.body.estado;


        director = await director.save();
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el director');
    }
};

// Actualizar un director (PUT)
const updateDirector = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).send('El director no existe');
        }

        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
       
        director = await director.save();
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el director');
    }
};

module.exports = {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector
};