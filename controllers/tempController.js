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
                        return res.render('ventas')
            })
        })
    }) 
}

