const express = require('express')
const router = express.Router()
const multer = require('multer')
const mimeTypes = require('mime-types')

const storage = multer.diskStorage({
    destination:'controllers/',
    filename:(req,file,cb)=>{
        //cb("","productos_" + Date.now() + "." + mimeTypes.extension(file.mimetype))
        cb("","productos.csv")
    }
})

/*const storage = multer.diskStorage({
	destination: 'archivos/',
	filename: function(req, file, cb){
		cb("",file.originalname)
		nombre = file.orginalname
	}
})*/

const cargar = multer({
    storage: storage
})

const productosController = require('../controllers/productosController')

//mapping mostrar productos
router.get('/productos', productosController.mostrar)

//mapping cargar archivo productos
router.post('/productos/cargar',cargar.single('archivo'), productosController.cargar)

//mapping crear productos
router.post('/productos/crear', productosController.crear)

//mapping modificar productos
router.post('/productos/modificar', productosController.modificar)

//mapping eliminar productos
router.get('/productos/eliminar/:_id', productosController.eliminar)


module.exports = router