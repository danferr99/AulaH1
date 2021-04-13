const vacinaRepositorio = require('../models/Vacina');


module.exports.buscaVacina = async function() {


return vacinaRepositorio.find();

}

module.exports.buscaPacientePorCpf = async function(cpf){

return await vacinaRepositorio.find({cpf});

}

module.exports.insereVacina = async function(novaVacina){
const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = novaVacina;

const retornoVacina = await vacinaRepositorio.create({
    nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf


});

return retornoVacina;

}



module.exports.atualizaVacina = async function(atualizaVacina){


    const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = atualizaVacina;
    
    const vacinaAtualizada = await vacinaRepositorio.updateOne(
        
        { cpf }, //filtro
        {// campos que vamos atualizar
            $set:
            {
                 nome
            }
        }
        
        );

            return vacinaAtualizada;

}

module.exports.removeVacina = async function(cpf) {


    return vacinaRepositorio.deleteOne({ cpf });
}