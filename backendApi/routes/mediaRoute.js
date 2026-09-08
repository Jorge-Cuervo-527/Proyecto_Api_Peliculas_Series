const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getMedias, 
    getMediaById, 
    createMedia, 
    updateMedia, 
    deleteMedia 
} = require('../controllers/mediaController');

const router = Router();

// GET
router.get('/', getMedias);
router.get('/:id', getMediaById);

// POST
router.post('/', [
    check('serial', 'El serial es requerido').not().isEmpty(),
    check('titulo', 'El título es requerido').not().isEmpty(),
    check('sinopsis', 'La sinopsis es requerida').not().isEmpty(),
    check('urlPelicula', 'La URL de la película es requerida').not().isEmpty(),
    check('imagenPortada', 'La imagen de portada es requerida').not().isEmpty(),
    check('anioEstreno', 'El año de estreno es requerido y debe ser numérico').isNumeric(),
    check('genero', 'El género es requerido y debe ser un ID válido').isMongoId(),
    check('director', 'El director es requerido y debe ser un ID válido').isMongoId(),
    check('productora', 'La productora es requerida y debe ser un ID válido').isMongoId(),
    check('tipo', 'El tipo es requerido y debe ser un ID válido').isMongoId()
], createMedia);

// PUT
router.put('/:id', [
    check('serial', 'El serial es requerido').not().isEmpty(),
    check('titulo', 'El título es requerido').not().isEmpty(),
    check('sinopsis', 'La sinopsis es requerida').not().isEmpty(),
    check('urlPelicula', 'La URL de la película es requerida').not().isEmpty(),
    check('imagenPortada', 'La imagen de portada es requerida').not().isEmpty(),
    check('anioEstreno', 'El año de estreno es requerido y debe ser numérico').isNumeric(),
    check('genero', 'El género es requerido y debe ser un ID válido').isMongoId(),
    check('director', 'El director es requerido y debe ser un ID válido').isMongoId(),
    check('productora', 'La productora es requerida y debe ser un ID válido').isMongoId(),
    check('tipo', 'El tipo es requerido y debe ser un ID válido').isMongoId()
], updateMedia);

// DELETE
router.delete('/:id', deleteMedia);

module.exports = router;