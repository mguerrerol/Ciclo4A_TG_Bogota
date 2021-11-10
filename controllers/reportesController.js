const Clientes = require('../model/Clientes')
const Cliente = require('../model/Clientes')

//cargar pagina reportes
module.exports.cargar = (req, res)=>{
    Cliente.find({},(error, clientes)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los clientes'
            })
        }
        //return console.log(clientes)
        return res.render('reportes',{clientes: clientes})
    
    })
}

module.exports.mostrarclientes = (req, res)=>{
    Cliente.find({},(error, clientes)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los clientes'
            })
        }
        //return console.log(clientes)
        return ({clientes: clientes})
    })
}
