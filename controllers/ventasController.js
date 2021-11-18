const Ventas = require('../model/Ventas')
const Venta = require('../model/Ventas')
const Clientes = require('../model/Clientes')
const cliente = require('../model/Clientes')
const Productos = require('../model/Productos')
const Producto = require('../model/Productos')
const db = require('../db')

//cargar pagina ventas
module.exports.cargar = (req, res)=>{
    res.render('ventas')
}

module.exports.cedulacliente = (req, res) => {
    const txtCedula = req.body.txtcedula_cliente_ventas
    const txtCodigo = req.body.txtcodigo_producto_detalle_ventas
    const txtCantidad = req.body.txtcantidad_producto_detalle_ventas
    var totalfinal = req.body.txttotal_venta_ventas
    var totalparcial = 0
    var incrementoiva = 0
    var totalparcialconiva = 0
    var txtNombreCliente = "CLIENTE NO EXISTE"
    var txtNombreProducto = "PRODUCTO NO EXISTE"
    var txtValorProducto = 0
    var txtIVAProducto = 0
    var txtConsecutivo = 0 
   
    //saca la lista de loc clientes para sacar el nombre
    Clientes.find({},(error, clientes)=>{
        if(error){
            return res.status(500).json({
                message: 'Error al buscar el cliente'
            })
        }
        //console.log(clientes)
        clientes.forEach((cliente) => {
            if (cliente._id === txtCedula)
            {
                txtNombreCliente = cliente.nombre_clientes        
            }
        })
        
            //calcula el consecutivo
            Ventas.find({},(error, ventas)=>{
                if(error){
                    return res.status(500).json({
                    message: 'Error al buscar las ventas'
                    })
                }
                //console.log(ventas)
                ventas.forEach((venta) => {
                    if (txtConsecutivo < venta.codigo_venta_ventas )
                    {
                        txtConsecutivo = venta.codigo_venta_ventas       
                    }
                })
                txtConsecutivo += 1

                    //Saca la lista de los productos para sacar el valor, nombre, IVA
                    Productos.find({},(error, productos)=>{
                        if(error){
                            return res.status(500).json({
                            message: 'Error mostrando los productos'
                            })
                        }
                        //console.log(productos)
                        productos.forEach((producto) => {
                            if (txtCodigo  === producto._id)
                            {
                                txtNombreProducto = producto.nombre_productos
                                txtValorProducto = producto.precio_venta_productos
                                txtIVAProducto = producto.ivacompra_productos
                            }
                        })
        
                        totalparcial = txtCantidad * txtValorProducto
                        incrementoiva = totalparcial * (txtIVAProducto / 100)
                        totalparcialconiva = totalparcial + incrementoiva 
                        totalfinal += totalparcialconiva
                        
                        console.log('codigo del producto del front: ' + txtCodigo)
                        console.log('cantidad de producto del front: ' + txtCantidad)
                        console.log('nombre del cliente: ' + txtNombreCliente)
                        console.log('total parcial sin iva: ' + totalparcial)
                        console.log('nombre del producto: ' + txtNombreProducto)
                        console.log('precio del producto: ' + txtValorProducto)
                        console.log('iva del producto: ' + txtIVAProducto)
                        console.log('iva parcial: ' + incrementoiva)
                        console.log('total parcial con iva: ' + totalparcialconiva)
                        console.log('total final: ' + totalfinal) 
                        console.log('consecutivo: ' + txtConsecutivo)
                        return res.render('ventas'{})
            })
        })
    }) 
}


module.exports.registrar = (req, res)=>{
    //console.log(req.body)
    const venta = new Ventas({
        codigo_venta_ventas:req.body.txtcodigo_venta_ventas,
        cedula_cliente_ventas:req.body.txtcedula_cliente_ventas,
        detalle_ventas:[{ 
            cantidad_producto_detalle_ventas:req.body.txtcantidad_producto_detalle_ventas,
            codigo_producto_detalle_ventas:req.body.txtcodigo_producto_detalle_ventas,
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
