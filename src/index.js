//importando pacotes
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/pacientesRota');


//preparar para usar express e etc...
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

require('dotenv').config({
    path: process.env.NODE_ENV === "test" ?
        "./src/config/.env.testing"
        : "./src/config/.env"
});



console.log(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, {
useNewUrlParser : true,
useUnifiedTopology : true

});

// 1 parametro o nome da rota
// 2 parametro ação qeu vou fazer função  
// java script arrow function
// (parametros) => {codigos programa fazer}

module.exports = app.listen(process.env.PORT || 3334, () => {
    console.log("Server running");
});