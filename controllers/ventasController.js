const Ventas = require('../model/Ventas')
const Venta = require('../model/Ventas')
const DetalleVentas = require('../model/DetalleVentas')
const DetalleVenta = require('../model/DetalleVentas')
const Clientes = require('../model/Clientes')
const Cliente = require('../model/Clientes')
const Productos = require('../model/Productos')
const Producto = require('../model/Productos')
const db = require('../db')

//cargar pagina ventas
module.exports.cargar = (req, res)=>{
    const txtCedula = ""
    const txtCodigo = ""
    const txtCantidad = ""
    var totalfinal = 0
    var totalparcial = 0
    var totaliva = 0
    var totalparcial = 0
    var incrementoiva = 0
    var totalparcialconiva = 0
    var txtNombreCliente = ""
    var txtNombreProducto = ""
    var txtValorProducto = 0
    var txtIVAProducto = 0
    var txtConsecutivo = 0 
    var valoriva = 0

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
        DetalleVentas.find({},(error, detalles)=>{
            if(error){
                return res.status(500).json({
                message: 'Error mostrando los detalle ventas'
                })
            }
            //console.log(detalleventas)
            return res.render('ventas',{detalles: detalles, txtCedula, txtNombreCliente, totalfinal, txtConsecutivo, totalparcial, totaliva})
        })                               
    })                                     
}

module.exports.nuevaventa = (req, res) => {
    DetalleVentas.remove({},(error)=>{
        if(error){
            return res.status(500).json({
            message: 'error al eliminar los detalle ventas'
            })
        }
        console.log('coleccion vaciada con exito') 
        res.redirect('/ventas')
    }) 
}


module.exports.cedulacliente = (req, res) => {
    console.log("===== BOTON REGISTRAR PRODUCTO ======")
    const txtCedula = req.body.txtcedula_cliente_ventas
    const txtCodigo = req.body.txtcodigo_producto_detalle_ventas
    const txtCantidad = req.body.txtcantidad_producto_detalle_ventas
    var totalfinal = 0
    var totalparcial = 0
    var totaliva = 0
    var incrementoiva = 0
    var totalparcialconiva = 0
    var txtNombreCliente = "CLIENTE NO REGISTRADO"
    var txtNombreProducto = "PRODUCTO NO EXISTE"
    var txtValorProducto = 0
    var txtIVAProducto = 0
    var txtConsecutivo = 0 
    var valoriva = 0
   
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

                        if(txtValorProducto == 0)
                        {
                            console.log('producto no grabado')
                        }
                        else
                        {
                            totalparcial = txtCantidad * txtValorProducto
                            incrementoiva = Math.round(totalparcial * (txtIVAProducto / 100))
                            totalparcialconiva = totalparcial + incrementoiva
                            valoriva = totalparcialconiva - totalparcial
                            totalfinal += totalparcialconiva

                            const detalleventa = new DetalleVentas({
                                codigo_venta_ventas:txtConsecutivo,
                                cantidad_producto_detalle_ventas:txtCantidad,
                                codigo_producto_detalle_ventas:txtCodigo,
                                nombre_producto_detalle_ventas: txtNombreProducto,
                                valor_producto_detalle_ventas: txtValorProducto,
                                valor_total_detalle_ventas:totalparcialconiva,
                                valor_venta_detalle_ventas:totalparcial,
                                valoriva_detalle_ventas:valoriva
                            })

                            console.log('detalle venta de un solo producto' + detalleventa)

                            const collectionName = 'db_detalleventas'
                            var collection = db.collection(collectionName)
                            collection.insertOne(detalleventa, (err, result) => {
                                if (err) console.log(err)
                                if(result){
                                    console.log('grabo lo datos de forma existosa')
                                }
                            })

                        }
                       
                        totalparcial = 0
                        totaliva = 0
                        totalfinal = 0
                        DetalleVentas.find({},(error, detalles)=>{
                            if(error){
                                return res.status(500).json({
                                message: 'Error mostrando los detalle ventas'
                                })
                            }
                            //console.log(detalleventas)
                            detalles.forEach((detalle) => {
                                totalparcial += detalle.valor_venta_detalle_ventas
                                totaliva += detalle.valoriva_detalle_ventas
                                totalfinal += detalle.valor_total_detalle_ventas
                            })
            
                            console.log('detalleventa de todos los productos'+ detalles)
                            console.log('cedula del cliente del front: ' + txtCedula)
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
                            return res.render('ventas',{detalles: detalles, txtCedula, txtNombreCliente, totalfinal, txtConsecutivo, totalparcial, totaliva })
                        })    
                    })
            })
    }) 
}

module.exports.registrar = (req, res)=>{
    console.log("===== boton registrar ======")

    var txtConsecutivo = 0
    var totalparcial = 0
    var totaliva = 0
    var totalfinal = 0

    var txtCedula = req.body.txtcedula

    var txtNombreCliente = "No Registrado" 
    var txtdireccionCliente = "No Registrado" 
    var txtTelefonoCliente = 0   
    var txtemailCliente = "No Registrado"     

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
        
    DetalleVentas.find({},(error, detalles)=>{
        if(error){
            return res.status(500).json({
            message: 'Error mostrando los detalle ventas'
            })
        }
        totalparcial = 0
        totaliva = 0
        totalfinal = 0
        detalles.forEach((detalle) => {
            totalparcial += detalle.valor_venta_detalle_ventas
            totaliva += detalle.valoriva_detalle_ventas
            totalfinal += detalle.valor_total_detalle_ventas
        })
    
        if(totalfinal == 0)
        {
            console.log('VENTA NULA, NO GRABADA')
        }
        else
        {
            const venta = new Ventas({
                codigo_venta_ventas:txtConsecutivo,
                cedula_cliente_ventas:req.body.txtcedula,
                detalle_ventas: detalles,
                ivaventas_ventas:totaliva,
                total_venta_ventas:totalfinal,
                valor_venta_ventas:totalparcial
            })

            console.log(venta)
                const collectionName = 'db_ventas';
                var collection = db.collection(collectionName);
                collection.insertOne(venta, (err, result) => {
                if (err) console.log(err);
                    if(result){
                        console.log('grabo lo datos de forma existosa');
                    }
                
                DetalleVentas.remove({},(error)=>{
                if(error){
                    return res.status(500).json({
                    message: 'error al eliminar los detalle ventas'
                    })
                }
                console.log('coleccion vaciada con exito') 
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
                                txtdireccionCliente = cliente.direccion_clientes 
                                txtTelefonoCliente = cliente.telefono_clientes   
                                txtemailCliente = cliente.email_clientes         
                            }
                        })



                    res.render('factura',{venta,detalles: detalles,txtNombreCliente, txtdireccionCliente, txtTelefonoCliente, txtemailCliente})
                    }) 
                }) 
            })              
        }
           
    })
})
}

module.exports.eliminar = (req, res) => {
    const _id = req.params._id
    DetalleVentas.findByIdAndRemove(_id, (error,detalle)=>{
        //console.log(req.body)
        if(error){
            return res.status(500).json({
                message: 'Error al eliminar la venta'
            })
        }
        res.redirect('/ventas')
    })
}
