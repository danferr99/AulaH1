const pacienteRepositorio = require('../models/Paciente');


module.exports.buscaPaciente = async function () {


return  pacienteRepositorio.find();

}

module.exports.buscaPacientePorCpf = async function (cpf){

return await pacienteRepositorio.findOne({ cpf });

}

module.exports.inserePaciente = async function (novoPaciente){
const {nome, cpf, altura, peso, imc , classificacao , dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid, email, senha} = novoPaciente;

const retornoPaciente = await pacienteRepositorio.create({
    nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha


});

return retornoPaciente;

}



module.exports.atualizaPaciente = async function (atualizaPaciente){


    const {nome , cpf, altura, peso, imc , classificacao , dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid, email, senha} = atualizaPaciente;
    
    const PacienteAtualizado = await pacienteRepositorio.updateOne(
        
        {cpf, altura, peso, imc , classificacao , dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid, email, senha}, //filtro
        {// campos que vamos atualizar
            $set:
            {
                 nome
            }
        }
        
        );

            return PacienteAtualizado;

}

module.exports.removePaciente = async function (cpf) {


    return pacienteRepositorio.deleteOne ({ cpf });
}

module.exports.verificaEmailSenha = async function (email, senha){

return pacienteRepositorio.findOne({email, senha});

}

module.exports.buscaPacientePorEmail = async function (email){

    return pacienteRepositorio.findOne({ email });
    
    }