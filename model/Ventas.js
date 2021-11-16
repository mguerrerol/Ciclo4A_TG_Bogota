const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventasSchema = new Schema({
    _id:String,
    codigo_venta_ventas:String,
    cedula_cliente_ventas:String,
    detalle_ventas:[{ 
        _id:String,
        cantidad_producto_detalle_ventas:Number,
        codigo_detalle_ventas:String,
        valor_total_detalle_ventas:Number,
        valor_venta_detalle_ventas:Number,
        valoriva_detalle_ventas:Number   
    }],
    ivaventas_ventas:Number,
    total_venta_ventas:Number,
    valor_venta_ventas:Number
}, {versionKey:false})

module.exports = mongoose.model('db_ventas',ventasSchema)

