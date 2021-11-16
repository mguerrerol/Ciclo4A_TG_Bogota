const path=require('path');
const express = require('express')
const db = require('./db')
const app = express()
const morgan=require('morgan')

//app.use(morgan('app'))

app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const reportes = require('./routes/reportes')
app.use(reportes)

const clientes = require('./routes/clientes')
app.use(clientes)

const productos = require('./routes/productos')
app.use(productos)

const ventas = require('./routes/ventas')
app.use(ventas)

const consolidados = require('./routes/consolidados')
app.use(consolidados)

const login = require('./routes/login')
app.use(login)

app.get('/',(req, res)=>{
    res.send('Se ha conectado a la aplicacion con exito')
})

app.listen(3000,()=>{
    console.log('Conexion existosa en http://localhost:3000')
})