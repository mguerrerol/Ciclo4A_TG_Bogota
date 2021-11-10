const express = require('express')
const router = express.Router()

const productosController = require('../controllers/productosController')

//mapping mostrar productos
router.get('/productos', productosController.mostrar)

//mapping cargar archivo productos
router.post('/productos/cargar', productosController.cargar)

//mapping modificar productos
router.post('/productos/modificar', productosController.modificar)

//mapping eliminar productos
router.get('/productos/eliminar/:_id', productosController.eliminar)

module.exports = router