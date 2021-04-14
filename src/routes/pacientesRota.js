const { Router, request } = require('express');
const pacienteServico = require('../services/pacienteServico');
const autenticacaoJWT = require('../services/authService');
const { validate } = require('../validations/validations');
const { PacienteValidationRules } = require('../validations/pacienteValidations');
//preparar parar usar o express;

const routes = Router();
//autenticacaoJWT.verificarToken
routes.get('/', async (request, response) => {
    const pacienteRetorno = await pacienteServico.buscaPaciente();
    return response.json(pacienteRetorno);
});

routes.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const pacienteRetorno = await pacienteServico.buscaPacientePorCpf(cpf);
    return response.json(pacienteRetorno);
});


    routes.post('/', PacienteValidationRules(), validate , async (request, response) => {

    
    
        const { nome, cpf, altura,  peso, imc , classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha } = request.body;
        console.log(request.body);
        //destruturação
        
        const novoPaciente = { nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha};
        const pacienteRetorno = await pacienteServico.inserePaciente(novoPaciente);
        if (pacienteRetorno === null){

            response.status(500).json({ "ERROR": "CPF Paciente já existe. Paciente do not be inserted" });
        }
        return response.status(201).json({ pacienteRetorno });
    
        });


        routes.put('/:cpf', async (request, response) => {
            //route params guid
        
            const { cpf} = request.params;
            const { nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
            const pacienteAtualizar = {nome,cpf, nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha};
            const pacienteRetorno = await pacienteServico.atualizaPaciente(pacienteAtualizar);      
            if (!pacienteRetorno)
        return response.status(404).json({ "error": "Paciente não encontado!" });

    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
                
               
        
        });
        
       
        
        routes.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
           
            const { cpf } = request.params;
           console.log(cpf); 
            const pacienteRetorno = await pacienteServico.removePaciente(cpf);
            if (!pacienteRetorno) 
                return response.status(404).json({ "error": "Paciente não encontrado!!" });
            
                
                return response.status(200).json({ "Message": `Paciente ${cpf} removido` });
        });

        module.exports = routes;