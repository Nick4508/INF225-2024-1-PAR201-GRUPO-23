const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");
const radiografiasRoutes = require("./Routes/radiografias")
const scannersRoutes = require("./Routes/scanners")
const ecografiasRoutes = require("./Routes/ecografias")
const resonaciasRoutes = require("./Routes/resonancias")
const users = require("./Routes/users")

const app = express();

app.set("port", process.env.PORT || 5000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

db();
app.use('/radiografias', radiografiasRoutes);
app.use('/scanners', scannersRoutes);
app.use('/ecografias', ecografiasRoutes);
app.use('/resonancias', resonaciasRoutes);
app.use('/users', users);


app.listen(app.get("port"), () =>{
    console.log(`El servidor está corriendo en el puerto: ${app.get("port")}`)
})

module.exports = app; 