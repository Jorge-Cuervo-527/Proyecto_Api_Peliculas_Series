const { Router } = require('express');
const { check } = require('express-validator');
const { getGeneros, createGenero, updateGenero, getGeneroById } = require('../controllers/generoController');

const router = Router();

// Ruta para listar géneros (GET)
router.get('/', getGeneros);
router.get('/:id', getGeneroById);

// Ruta para crear un género (POST) con validaciones
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], createGenero);

// Ruta para actualizar un género (PUT)
router.put('/:id', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], updateGenero);

module.exports = router;