const Productos = require('../model/Productos')
const Producto = require('../model/Productos')
const formidable = require('formidable');

//mostrar metodos de la api
module.exports.mostrar = (req, res)=>{
    Productos.find({},(error, productos)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los productos'
            })
        }
        //return console.log(productos)
        return res.render('productos',{productos: productos})
    })
}

//cargar archivo
module.exports.cargar = (req, res)=>{

    const prueba = Productos.find({},(error, productos)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los productos'
            })
        }
    })

    console.log(prueba)
    const form = new formidable.IncomingForm()
    console.log("entre al metodo cargar")
    form.parse(req, function (error, fields, files) {
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los productos'
            })
        }
        console.log("no entre al error")
        return console.log("supuestamente subio el archivo")
        //return res.render('productos',{productos: productos})
    })
} 
  

//modificar
module.exports.modificar = (req, res)=>{
    const _id = req.body.txtCodigo_editar
    const ivacompra_productos = req.body.txtIVA_editar
    const nitproveedor_productos = req.body.txtNit_editar
    const nombre_productos = req.body.txtNombre_editar
    const precio_compra_productos =  req.body.txtPrecioCompra_editar
    const precio_venta_productos =  req.body.txtPrecioVenta_editar
    Producto.findByIdAndUpdate(_id, {ivacompra_productos, nitproveedor_productos, nombre_productos, precio_compra_productos, precio_venta_productos}, (error, producto)=>{
        console.log(req.body)
        if(error){
            return res.status(500).json({
                message: 'Error al modificar el Producto'
            })
        }
        res.redirect('/productos')
    })
}

//eliminar
module.exports.eliminar = (req, res) => {
    const _id = req.params._id
    Producto.findByIdAndRemove(_id, (error,producto)=>{
        //console.log(req.body)
        if(error){
            return res.status(500).json({
                message: 'Error al eliminar el Producto'
            })
        }
        res.redirect('/productos')
    })
}

