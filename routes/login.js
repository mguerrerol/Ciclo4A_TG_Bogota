const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

//mapping cargar login
router.get('/login', loginController.cargar)
//router.get('/login', (req,res)=>{
//    res.render('login',{alert:false})
//})

router.post('/login', loginController.login)

module.exports = router