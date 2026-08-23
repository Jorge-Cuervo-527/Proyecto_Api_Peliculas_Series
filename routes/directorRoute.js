const { Router } = require('express');
const { check } = require('express-validator');
const { getDirectores, getDirectorById, createDirector, updateDirector } = require('../controllers/directorController');

const router = Router();

// GET
router.get('/', getDirectores);
router.get('/:id', getDirectorById);

// POST
router.post('/', [
    check('nombres', 'Los nombres son requeridos').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], createDirector);

// PUT
router.put('/:id', [
    check('nombres', 'Los nombres son requeridos').not().isEmpty(),
    check('estado', 'El estado es requerido y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], updateDirector);

module.exports = router;