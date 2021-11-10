const express = require('express')
const router = express.Router()

const clienteController = require('../controllers/clienteController')

//mapping mostrar clientes
router.get('/clientes', clienteController.mostrar)

//mapping crear clientes
router.post('/clientes/crear', clienteController.crear)

//mapping modificar clientes
router.post('/clientes/modificar', clienteController.modificar)

//mapping eliminar clientes
router.get('/clientes/eliminar/:_id', clienteController.eliminar)

module.exports = router