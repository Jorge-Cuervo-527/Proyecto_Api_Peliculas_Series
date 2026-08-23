const { Router } = require('express');
const { check } = require('express-validator');
const { getTipos, getTipoById, createTipo, updateTipo } = require('../controllers/tipoController');

const router = Router();

// GET - Listar todos los tipos
router.get('/', getTipos);

// GET - Obtener un tipo por ID
router.get('/:id', getTipoById);

// POST - Crear un nuevo tipo
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
], createTipo);

// PUT - Actualizar un tipo existente
router.put('/:id', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
], updateTipo);

module.exports = router;