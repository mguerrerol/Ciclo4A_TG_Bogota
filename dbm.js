const dbm = require('mongoose')

dbm.connect('mongodb://localhost/Ciclo4A_BOGOTA',{})
.then(con=>{
	console.log("Base de datos conectada")
})
.catch(error=>{
	console.log("Error: " + error.message)
})

dbm.Ciclo4A_BOGOTA = dbm.createConnection('mongodb://localhost/Ciclo4A_BOGOTA',{})

dbm.Ciclo4A_CALI = dbm.createConnection('mongodb://localhost/Ciclo4A_CALI',{})

dbm.Ciclo4A_MEDELLIN = dbm.createConnection('mongodb://localhost/Ciclo4A_MEDELLIN',{})

module.exports = dbm

