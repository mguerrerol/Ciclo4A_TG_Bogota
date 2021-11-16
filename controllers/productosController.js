const Productos = require('../model/Productos')
const Producto = require('../model/Productos')
//const formidable = require('formidable')
const csvtojson = require('csvtojson')
const db = require('../db')


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
    //console.log(__dirname);
    //console.log("entre al metodo cargar")

    // CSV file name
    const archivo = __dirname + "\\productos.csv"
    //console.log("cargo el archivo en el metodo " + archivo)

    const csvFilePath= __dirname + "\\productos.csv"
    console.log(csvFilePath);
    console.log(archivo);
    csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
	console.log(jsonObj);
	 
})

// Async / await usage
const jsonArray= csvtojson().fromFile(csvFilePath);

    csvtojson().fromFile("/productos.csv")
    .then(productos => {
        // users is a JSON array
        // log the JSON array
        console.log(productos);
    }).catch(err => {
        // log error if any
        console.log(err);
    });
    

    const arrayToInsert = [];
    csvtojson().fromFile(archivo).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
        console.log("estoy dentro del for")
         var oneRow = {
            _id: source[i]['_id'],
            ivacompra_productos: source[i]['ivacompra_productos'],
            nitproveedor_productos: source[i]['nitproveedor_productos'],
            nombre_productos: source[i]['nombre_productos'],
            precio_compra_productos: source[i]['precio_compra_productos'],
            precio_venta_productos: source[i]['precio_venta_productos']
         };
         arrayToInsert.push(oneRow);
     }
     console.log("ya pase el for")
     console.log(arrayToInsert)     
     
     //inserting into the table “employees”
     const collectionName = 'db_productos';
     var collection = db.collection(collectionName);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log('grabo lo datos de forma existosa');
         }
     });
})
 
res.redirect('/productos')
} 

//crear
module.exports.crear = (req, res)=>{
    //console.log(req.body)
    const producto = new Productos({
        _id: req.body.txtCodigo,
        ivacompra_productos: req.body.txtIVA,
        nitproveedor_productos: req.body.txtNIT,
        nombre_productos: req.body.txtNombre,
        precio_compra_productos: req.body.txtCompra,
        precio_venta_productos: req.body.txtVenta 
    })
    producto.save(function(error,producto){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el producto'
            })
        }
        res.redirect('/productos')
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
        //console.log(req.body)
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

