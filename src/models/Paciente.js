const mongoose = require('mongoose');
const pacienteSchema = new mongoose.Schema({

    nome : String,
    cpf : String,
    peso : Number,
    altura : Number,
    imc : Number,
    classificacao : String

});


module.exports = mongoose.model('Paciente',pacienteSchema);

