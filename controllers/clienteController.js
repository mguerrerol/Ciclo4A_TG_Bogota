const Clientes = require('../model/Clientes')
const Cliente = require('../model/Clientes')

//mostrar metodos de la api
module.exports.mostrar = (req, res)=>{
    Cliente.find({},(error, clientes)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los clientes'
            })
        }
        //return console.log(clientes)
        return res.render('clientes',{clientes: clientes})
    })
}

//crear
module.exports.crear = (req, res)=>{
    //console.log(req.body)
    const cliente = new Clientes({
        _id: req.body.txtCedula,
        direccion_clientes: req.body.txtDireccion,
        email_clientes: req.body.txtCorreo,
        nombre_clientes: req.body.txtNombre,
        telefono_clientes: req.body.txtTelefono
    })
    
    cliente.save(function(error,cliente){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Cliente'
            })
        }
        res.redirect('/clientes')
    })
}

//modificar
module.exports.modificar = (req, res)=>{
    const _id = req.body.txtCedula_editar
    const direccion_clientes = req.body.txtDireccion_editar
    const email_clientes = req.body.txtCorreo_editar
    const nombre_clientes = req.body.txtNombre_editar   
    const telefono_clientes =  req.body.txtTelefono_editar
    Cliente.findByIdAndUpdate(_id, {direccion_clientes,email_clientes,nombre_clientes,telefono_clientes}, (error, cliente)=>{
        //console.log(req.body)
        if(error){
            return res.status(500).json({
                message: 'Error al modificar el Cliente'
            })
        }
        res.redirect('/clientes')
    })
}

//eliminar
module.exports.eliminar = (req, res) => {
    const _id = req.params._id
    Cliente.findByIdAndRemove(_id, (error,cliente)=>{
        //console.log(req.body)
        if(error){
            return res.status(500).json({
                message: 'Error al eliminar el Cliente'
            })
        }
        res.redirect('/clientes')
    })
}


