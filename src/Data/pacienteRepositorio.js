const pacienteRepositorio = require('../models/Paciente');


module.exports.buscaPaciente = async function() {


return  pacienteRepositorio.find();

}

module.exports.buscaPacientePorCpf = async function(cpf){

return await pacienteRepositorio.find({ cpf });

}

module.exports.inserePaciente = async function(novoPaciente){
const {nome, cpf, altura, peso, imc , classificacao , dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid} = novoPaciente;

const retornoPaciente = await pacienteRepositorio.create({
    nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid


});

return retornoPaciente;

}



module.exports.atualizaPaciente = async function(atualizaPaciente){


    const {nome , cpf, altura, peso, imc , classificacao , dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid} = atualizaPaciente;
    
    const PacienteAtualizado = await pacienteRepositorio.updateOne(
        
        { cpf }, //filtro
        {// campos que vamos atualizar
            $set:
            {
                 nome
            }
        }
        
        );

            return PacienteAtualizado;

}

module.exports.removePaciente = async function(cpf) {


    return pacienteRepositorio.deleteOne({ cpf });
}