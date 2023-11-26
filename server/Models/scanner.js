const { Schema, model } = require('mongoose')


const scanner_schema = new Schema({
    rut : Number,
    email : String,
    fecha : Date,
    nombre : String,
    hora : Date,
    random : String,

})
module.exports = model('Scanner',scanner_schema)