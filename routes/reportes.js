const express = require('express')
const router = express.Router()

const reportesController = require('../controllers/reportesController')

//mapping cargar reportes
router.get('/reportes', reportesController.cargar)

router.get('/reportes/reporteclientes', reportesController.mostrarclientes)

module.exports = router