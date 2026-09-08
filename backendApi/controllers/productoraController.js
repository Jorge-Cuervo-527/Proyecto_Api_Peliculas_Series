const Productora = require('../app/models/productoraModel');
const { validationResult } = require('express-validator');

// Listar todas las productoras (GET)
const getProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar las productoras');
    }
};

// Obtener una productora por ID (GET por ID)
const getProductoraById = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).send('La productora no existe');
        }
        res.send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar la productora');
    }
};

// Crear una productora (POST)
const createProductora = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let productora = new Productora();
        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();
        res.send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear la productora');
    }
};

// Actualizar una productora (PUT)
const updateProductora = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).send('La productora no existe');
        }

        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();
        res.send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la productora');
    }
};

module.exports = {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora
};

