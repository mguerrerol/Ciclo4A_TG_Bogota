const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

//mapping cargar login
router.get('/login', loginController.cargar)

router.post('/login/validar', loginController.validar)

module.exports = router