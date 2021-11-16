const express = require('express')
const router = express.Router()

const consolidadosController = require('../controllers/consolidadosController')

//mapping cargar ventas
router.get('/consolidados', consolidadosController.cargar)

module.exports = router