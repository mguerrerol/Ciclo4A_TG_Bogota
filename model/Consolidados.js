const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consolidadosSchema = new Schema({
    _id:String,
    id_consolidado:String,
    ciudad_consolidado:String,
    ventas_consolidado: Number,
}, {versionKey:false})

module.exports = mongoose.model('db_consolidados',consolidadosSchema)

