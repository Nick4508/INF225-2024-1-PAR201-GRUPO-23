const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://nicolas:admin123@database.6atshhf.mongodb.net/?retryWrites=true&w=majority"
//admin123
const db = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log("BD conectada ", conn.connection.host);
    }catch (error){
        console.log(error)
    }
} 

module.exports = db;