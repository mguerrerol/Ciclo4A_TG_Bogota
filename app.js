const express = require('express')
const db = require('./db')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const reportes = require('./routes/reportes')
app.use(reportes)

const clientes = require('./routes/clientes')
app.use(clientes)

const productos = require('./routes/productos')
app.use(productos)

const login = require('./routes/login')
app.use(login)

app.get('/',(req, res)=>{
    res.send('Se ha conectado a la aplicacion con exito')
})

app.listen(3000,()=>{
    console.log('Conexion existosa en http://localhost:3000')
})