const Media = require('../app/models/mediaModel');
const Genero = require('../app/models/generoModel');
const Director = require('../app/models/directorModel');
const Productora = require('../app/models/productoraModel');
const { validationResult } = require('express-validator');

const getMedias = async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('genero', 'nombre estado descripcion')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado slogan descripcion')
            .populate('tipo', 'nombre descripcion');
        res.send(medias);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar las medias');
    }
};

const getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id)
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        if (!media) {
            return res.status(404).send('La media no existe');
        }
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar la media');
    }
};

const createMedia = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        // --- VALIDACIONES DE ESTADO (Requisito del Caso de Estudio) ---
        const generoBD = await Genero.findById(req.body.genero);
        if (!generoBD || generoBD.estado !== 'Activo') {
            return res.status(400).send('El género seleccionado no existe o está Inactivo');
        }

        const directorBD = await Director.findById(req.body.director);
        if (!directorBD || directorBD.estado !== 'Activo') {
            return res.status(400).send('El director seleccionado no existe o está Inactivo');
        }

        const productoraBD = await Productora.findById(req.body.productora);
        if (!productoraBD || productoraBD.estado !== 'Activo') {
            return res.status(400).send('La productora seleccionada no existe o está Inactiva');
        }
        
        let media = new Media({
            serial: req.body.serial,
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            urlPelicula: req.body.urlPelicula,
            imagenPortada: req.body.imagenPortada,
            anioEstreno: req.body.anioEstreno,
            genero: req.body.genero,
            director: req.body.director,
            productora: req.body.productora,
            tipo: req.body.tipo
        });

        media = await media.save();
        res.send(media);
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).send('El serial o la URL de la película ya existen en la base de datos');
        }
        res.status(500).send('Ocurrió un error al crear la media');
    }
};

const updateMedia = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).send('La media no existe');
        }

        // --- VALIDACIONES DE ESTADO (Para no permitir actualizar con inactivos) ---
        const generoBD = await Genero.findById(req.body.genero);
        if (!generoBD || generoBD.estado !== 'Activo') {
            return res.status(400).send('El género seleccionado no existe o está Inactivo');
        }

        const directorBD = await Director.findById(req.body.director);
        if (!directorBD || directorBD.estado !== 'Activo') {
            return res.status(400).send('El director seleccionado no existe o está Inactivo');
        }

        const productoraBD = await Productora.findById(req.body.productora);
        if (!productoraBD || productoraBD.estado !== 'Activo') {
            return res.status(400).send('La productora seleccionada no existe o está Inactiva');
        }
        

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPelicula = req.body.urlPelicula;
        media.imagenPortada = req.body.imagenPortada;
        media.anioEstreno = req.body.anioEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save();
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la media');
    }
};

const deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).send('La media no existe');
        }
        res.send({ message: 'Media eliminada exitosamente', media });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar la media');
    }
};

module.exports = {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};