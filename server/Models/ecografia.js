const { Schema, model } = require('mongoose')


const ecografiaSchema = new Schema({
    rut : Number,
    email : String,
    fecha : Date,
    nombre : String,
    hora : Date,
})

module.exports = model('ecografia',ecografiaSchema)