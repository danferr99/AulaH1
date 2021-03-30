const pacienteRepositorio = require('../models/Paciente');


module.exports.buscaPaciente = async function() {


return  pacienteRepositorio.find();

}

module.exports.inserePaciente = async function(novoPaciente){
const {nome, cpf, email} = novoPaciente;

const retornoPaciente = await pacienteRepositorio.create({
nome, cpf, email



});

return retornoPaciente;

}


