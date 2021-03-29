const mongoose = require('mongoose');
const pacienteSchema = new mongoose.Schema({

    nome : String,
    cpf : String,
    peso : Number,
    altura : Number,
    imc : Number,
    classificacao : String,
    dataNascimento : Date,
    cidade : String,
    UF : String,
    listaComorbidades : String,
    JaTeveCovid : String



});


module.exports = mongoose.model('Paciente',pacienteSchema);

