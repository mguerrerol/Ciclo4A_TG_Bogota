const Ventas = require('../model/Ventas')
const Venta = require('../model/Ventas')
const Clientes = require('../model/Clientes')
const cliente = require('../model/Clientes')
const db = require('../db')

//cargar pagina ventas
module.exports.cargar = (req, res)=>{
    res.render('ventas')
}

module.exports.cedulacliente = (req,res) =>{
    console.log("entre al metodo")
    const cedulacliente = req.body.cedulacliente

    console.log(cedulacliente)
    res.render('ventas')
}

module.exports.registrar = (req, res)=>{
    //console.log(req.body)
    const venta = new Ventas({
        codigo_venta_ventas:req.body.txtcodigo_venta_ventas,
        cedula_cliente_ventas:req.body.txtcedula_cliente_ventas,
        detalle_ventas:[{ 
            cantidad_producto_detalle_ventas:req.body.txtcantidad_producto_detalle_ventas,
            codigo_detalle_ventas:req.body.txtcodigo_detalle_ventas,
            valor_total_detalle_ventas:req.body.txtvalor_total_detalle_ventas,
            valor_venta_detalle_ventas:req.body.txtvalor_venta_detalle_ventas,
            valoriva_detalle_ventas:req.body.txtvaloriva_detalle_ventas,
        }],
        ivaventas_ventas:req.body.txtivaventas_ventas,
        total_venta_ventas:req.body.txttotal_venta_ventas,
        valor_venta_ventas:req.body.txtvalor_venta_ventas
    })
    console.log(venta)
    const collectionName = 'db_ventas';
    var collection = db.collection(collectionName);
    collection.insertOne(venta, (err, result) => {
        if (err) console.log(err);
        if(result){
            console.log('grabo lo datos de forma existosa');
        }
        res.redirect('/ventas')
    }); 
}


