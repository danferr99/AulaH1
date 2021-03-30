const pacienteRepositorio = require('../Data/pacienteRepositorio');
const calculadoraImc = require ('../util/imc');
module.exports.buscaPaciente = async function(){

  return pacienteRepositorio.buscaPaciente();



}


module.exports.inserePaciente = async function(novoPaciente){


  const {peso,altura} = novoPaciente;
  
  let imc = calculadoraImc.imc(peso,altura);
  let classificacao = calculadoraImc.classificacao(imc);
   
  novoPaciente.imc = imc;
  novoPaciente.classificacao = classificacao; 
  
  return pacienteRepositorio.inserePaciente(novoPaciente);
  
  
  
  }
  