const VentasBogota = require('../model/Ventas')
const VentaBogota = require('../model/Ventas')
const VentasCali = require('../model/VentasCali')
const VentaCali = require('../model/VentasCali')
const VentasMedellin = require('../model/VentasMedellin')
const VentaMedellin = require('../model/VentasMedellin')
const Consolidados = require('../model/Consolidados')
const Consolidado = require('../model/Consolidados')
const db = require('../db')

module.exports.cargar = (req, res)=>{
    var idconsolidado = 0
    var consolidado_bogota = 0
	var consolidado_cali = 0
	var consolidado_medellin = 0
	var ciudad = ""
	var ventatotal = 0
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
		
            VentaBogota.find({},(error, ventasbogota)=>{
                if(error){
                    return res.status(500).json({
                        message: 'Error mostrando las ventas'
                    })
                }
				
                ventasbogota.forEach((ventabogota) => {
                    consolidado_bogota += ventabogota.total_venta_ventas
					ciudad = "Bogota"
                }) //cierra el foreach anterior que calcula el consolidado de Bogota
				
					const consolidadoBogota = new Consolidados({
                    	id_consolidado:idconsolidado,
                    	ciudad_consolidado:ciudad,
                    	ventas_consolidado: consolidado_bogota,
					}) // cierra el objeto de tipo consolidado de la ciudad de bogota
					
					console.log(consolidadoBogota)
					const collectionName = 'db_consolidados';
					var collection = db.collection(collectionName);
					collection.insertOne(consolidadoBogota, (err, result) => {
					if (err) console.log(err);
						if(result){
							console.log('grabo lo datos de forma existosa consolidado Bogota');
						}
				
					//comienza el proceso para el consolidado de la segunda ciudad (Cali)
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
						}) // cierra el foreach anterior que calcula el id del consolidado para cali
						idconsolidado += 1
						ciudad = ""
							
						VentaCali.find({},(error, ventascali)=>{
							if(error){
								return res.status(500).json({
									message: 'Error mostrando las ventas de cali'
								})
							}
							ventascali.forEach((ventacali) => {
								consolidado_cali += ventacali.total_venta_ventas
								ciudad = "Cali"
							}) //cierra el foreach anterior que calcula el consolidado de cali
					
								const consolidadoCali = new Consolidados({
								id_consolidado:idconsolidado,
								ciudad_consolidado:ciudad,
								ventas_consolidado: consolidado_cali,
								}) // cierra el objeto de tipo consolidado de la ciudad de cali

								console.log(consolidadoCali)
								const collectionName = 'db_consolidados';
								var collection = db.collection(collectionName);
								collection.insertOne(consolidadoCali, (err, result) => {
								if (err) console.log(err);
									if(result){
										console.log('grabo lo datos de forma existosa consolidado cali');
									}
						
							
								//comienza el proceso para el consolidado de la segunda ciudad (Medellin)
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
									}) // cierra el foreach anterior que calcula el id del consolidado para cali
									idconsolidado += 1
									ciudad = ""
									VentaMedellin.find({},(error, ventasmedellin)=>{
										if(error){
											return res.status(500).json({
												message: 'Error mostrando las ventas Medellin'
											})
										}
										ventasmedellin.forEach((ventamedellin) => {
											consolidado_medellin += ventamedellin.total_venta_ventas
											ciudad = "Medellin"
										}) //cierra el foreach anterior
										
											const consolidadoMedellin = new Consolidados({
											id_consolidado:idconsolidado,
											ciudad_consolidado:ciudad,
											ventas_consolidado: consolidado_medellin,
											}) // cierra el objeto de tipo consolidado de la ciudad de medellin

											console.log(consolidadoMedellin)
												const collectionName = 'db_consolidados';
												var collection = db.collection(collectionName);
												collection.insertOne(consolidadoMedellin, (err, result) => {
												if (err) console.log(err);
													if(result){
														console.log('grabo lo datos de forma existosa consolidado medellin');
													}
											
											ventatotal = consolidado_bogota + consolidado_cali + consolidado_medellin
											var consolidados =[consolidado_bogota, consolidado_medellin, consolidado_cali]
											return res.render('consolidados',{consolidado_bogota,consolidado_cali,consolidado_medellin,ventatotal, consolidados})
										
											})//cierra la funcion que graba el objeto en la base de datos Medellin
										})//cierra la funcion de la lista de ventas de medellin para calcular el consolidado de medellin
									})//cierra la lista del consolidado para sacar el consecutivo de medellin
								})//cierra la funcion que graba el objeto en la base de datos Cali
							})//cierra la lista del consolidado para sacar el consecutivo de cali
						})// cierra la funcion de la lista de ventas de cali para calcular el consolidado de cali
                    })//cierra la funcion que graba el objeto en la base de datos Bogota
            }) // cierra la funcion de la segunda lista de ventas para calcular el consolidado de bogota
    }) // cierra la funcion de la primera lista de consolidados para hacer el consecutivo
}

//cargar pagina consolidados
/* module.exports.cargar = (req, res)=>{
    res.render('consolidados')
}
 */
