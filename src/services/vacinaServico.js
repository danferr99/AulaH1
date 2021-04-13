const vacinaRepositorio = require('../Data/vacinaRepositorio');

module.exports.buscaVacina = async function(){

  return vacinaRepositorio.buscaVacina();



}

module.exports.buscaPacientePorCpf = async function(cpf){


  return vacinaRepositorio.buscaPacientePorCpf(cpf);



}

module.exports.insereVacina = async function(novaVacina){

const vacinaRetorno = vacinaRepositorio.buscaVacina(novaVacina.cpf);
  if (vacinaRetorno.length == 0) {
  
    return null;

  }
  
  return vacinaRepositorio.insereVacina(novaVacina);
  
  
  
  }

  module.exports.atualizaVacina = async function(atualizaVacina){

const vacinaRetorno = await vacinaRepositorio.buscaPacientePorCpf(atualizaVacina.cpf);
if (vacinaRetorno.length == 0){

  return false;

}

const resultadoVacina = await vacinaRepositorio.atualizaVacina(atualizaVacina);

      return true;
}




  module.exports.removeVacina =  async function(cpf){

const vacinaRetorno = await vacinaRepositorio.buscaPacientePorCpf(cpf);
if (vacinaRetorno.length == 0){

  return false;

}
  
const resultadoVacina = await vacinaRepositorio.removeVacina(cpf);

return true;

  }
  