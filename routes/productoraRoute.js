const { Router } = require('express');
const { check } = require('express-validator');
const { getProductoras, getProductoraById, createProductora, updateProductora } = require('../controllers/productoraController');

const router = Router();

// GET
router.get('/', getProductoras);
router.get('/:id', getProductoraById);

// POST
router.post('/', [
    check('nombreProductora', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
], createProductora);

// PUT
router.put('/:id', [
    check('nombreProductora', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
], updateProductora);

module.exports = router;