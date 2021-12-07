const express = require('express')
const router = express.Router()

const ventasController = require('../controllers/ventasController')

//mapping cargar ventas
router.get('/ventas', ventasController.cargar)

router.post('/ventas', ventasController.cedulacliente)

//mapping cancelar e inicar una nueva venta
router.get('/ventas/nuevaventa', ventasController.nuevaventa)

//mapping registrar ventas
//router.post('/ventas/registrar', ventasController.registrar)
router.post('/factura', ventasController.registrar)

//mapping eliminar ventas
router.get('/ventas/eliminar/:_id', ventasController.eliminar)

module.exports = router