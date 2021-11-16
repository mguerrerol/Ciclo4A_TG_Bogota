const DetalleVentas = require('../model/DetalleVentas')
const DetalleVenta = require('../model/DetalleVentas')

module.exports.cargardatos = (req, res)=>{
    Detalleventas.find({},(error, detalleventas)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando las ventas'
            })
        }
        //return console.log(clientes)
        return ({detalleventas: detalleventas})
    })
}

