const express = require('express')
const router = express.Router()

const ventasController = require('../controllers/ventasController')

//mapping cargar ventas
router.get('/ventas', ventasController.cargar)

router.get('/ventas/cedulacliente',ventasController.cedulacliente)

//mapping registrar ventas
router.post('/ventas/registrar', ventasController.registrar)

module.exports = router