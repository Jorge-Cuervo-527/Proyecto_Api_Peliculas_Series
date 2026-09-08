const Tipo = require('../app/models/tipoModel');
const { validationResult } = require('express-validator');

// Listar todos los tipos (GET)
const getTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los tipos');
    }
};

// Obtener un tipo por ID (GET por ID)
const getTipoById = async (req, res) => {
    try {
        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).send('El tipo no existe');
        }
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar el tipo');
    }
};

// Crear un tipo (POST)
const createTipo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo');
    }
};

// Actualizar un tipo (PUT)
const updateTipo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).send('El tipo no existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el tipo');
    }
};

module.exports = {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo
};