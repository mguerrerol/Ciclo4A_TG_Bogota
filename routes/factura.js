const express = require('express')
const router = express.Router()

const consolidadosController = require('../controllers/facturaController')

//mapping cargar factura
router.post('/factura', consolidadosController.mostrar)

module.exports = router