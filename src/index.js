//importando pacotes
const express = require("express");
const cors = require('cors');

const routes = require('./routes/pacientesRota');
const routes2 = require ('./routes/vacinaRota');
const Authroutes = require("./routes/authRota");
const connectDB = require("./infra/database");

//require('dotenv').config({ path: './src/config/.env' });


connectDB();


const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', Authroutes );
app.use('/paciente', routes);
app.use('/vacina', routes2);



module.exports = app.listen(process.env.PORT || 3334, () => {
    console.log("Server running");
});