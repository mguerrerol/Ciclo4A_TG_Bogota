const Ventas = require('../model/Ventas')
const Venta = require('../model/Ventas')
const Consolidados = require('../model/Consolidados')
const Consolidado = require('../model/Consolidados')
const db = require('../db')

//cargar pagina login
module.exports.cargar = (req, res)=>{
    var txtConsecutivo = 0
    var consolidado_bogota = 0
    Consolidados.find({},(error, consolidados)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los consolidados'
            })
        }

        consolidados.forEach((consolidado) => {
            if (txtConsecutivo < consolidado.id_consolidado )
            {
                txtConsecutivo = consolidado.id_consolidado       
            }
        })
        txtConsecutivo += 1

            Venta.find({},(error, ventas)=>{
                if(error){
                    return res.status(500).json({
                        message: 'Error mostrando las ventas'
                    })
                }
                //return console.log(ventas)
                
                ventas.forEach((venta) => {
                    consolidado_bogota += venta.total_venta_ventas
                })

                const consolidadoBogota = new Consolidados({
                    id_consolidado:txtConsecutivo,
                    ciudad_consolidado:Bogota,
                    ventas_consolidado: consolidado_bogota,
                })

                const collectionName = 'db_consolidados'
                var collection = db.collection(collectionName)
                collection.insertOne(consolidadoBogota, (err, result) => {
                if (err) console.log(err){


                    if(result){
                        console.log('grabo lo datos de forma existosa')
                        }
                
                        Consolidado.find({},(error, consolidados)=>{
                            if(error){
                                return res.status(500).json({
                                    message: 'Error mostrando los clientes'
                            })
                          
                            return res.render('consolidados',{consolidados: consolidados})
                        })        
                    })
            })   
    })
}

module.exports.cargar = (req, res)=>{
    var idconsolidado = 0
    var consolidado_bogota = 0
    Consolidado.find({},(error, consolidados)=>{
        if(error){
            return res.status(500).json({
                message: 'Error mostrando los consolidados'
            })
        }
        consolidados.forEach((consolidado) => {
            if (idconsolidado < consolidado.id_consolidado )
            {
                idconsolidado = consolidado.id_consolidado       
            }
        }) // cierra el foreach anterior que calcula el id del consolidado
        idconsolidado += 1
            Venta.find({},(error, ventas)=>{
                if(error){
                    return res.status(500).json({
                        message: 'Error mostrando las ventas'
                    })
                }
                ventas.forEach((venta) => {
                    consolidado_bogota += venta.total_venta_ventas
                }) //cierra el foreach anterior que calcula el consolidado de Bogota

                const consolidadoBogota = new Consolidados({
                    id_consolidado:txtConsecutivo,
                    ciudad_consolidado:Bogota,
                    ventas_consolidado: consolidado_bogota,
                }) // cierra el objeto de tipo consolidado de la ciudad de bogota

                    const collectionName = 'db_consolidados'
                    var collection = db.collection(collectionName)
                    collection.insertOne(consolidadoBogota, (err, result) => {
                        if (err) console.log(err)
                            if(result){
                                console.log('grabo lo datos de forma existosa')
                            }
                                                    
                        return res.render('consolidados',{consolidado_bogota})
                    })//cierra la funcion que graba el objeto en la base de datos
            }) // cierra la funcion de la segunda lista de ventas para calcular el consolidado de bogota
    }) // cierra la funcion de la primera lista de consolidados para hacer el consecutivo
}