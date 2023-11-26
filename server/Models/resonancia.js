const { Schema, model } = require('mongoose')


const resonanciaSchema = new Schema({
    rut : Number,
    email : String,
    fecha : Date,
    nombre : String,
    hora : Date,
    random : String,


})
module.exports = model('Resonancia',resonanciaSchema)