const { Router, request } = require('express');
const pacienteServico = require('../services/pacienteServico');
const routes = Router();

//preparar parar usar o express;

routes.get('/paciente', async (request, response ) => {

    const pacienteRetorno = await pacienteServico.buscaPaciente();
    return response.json(pacienteRetorno);


});

routes.get('/paciente:cpf', async (request, response ) => {

    const pacienteRetorno = await pacienteServico.buscaPaciente();
    return response.json(pacienteRetorno);


});

    routes.post('/paciente', async (request, response) => {

    
    
        const { nome, cpf, altura,  peso, imc , classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
        console.log(request.body);
        //destruturação
        
        const novoPaciente = { nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid};
        const pacienteRetorno = await pacienteServico.inserePaciente(novoPaciente);
        if (pacienteRetorno === null){

            response.status(500).json({ "ERROR": "CPF Paciente já existe. Paciente do not be inserted" });
        }
        return response.status(201).json({ pacienteRetorno });
    
        });


        routes.put('/paciente/:cpf', async (request, response) => {
            //route params guid
        
            const { cpf} = request.params;
            const { nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
            const pacienteAtualizar = {nome,cpf, nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid};
            const pacienteRetorno = await pacienteServico.atualizaPaciente(pacienteAtualizar);      
            if (!pacienteRetorno)
        response.status(404).json({ "error": "Student não encontado!" });

    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
                
               
        
        });

        routes.delete('/paciente/:cpf', async (request, response) => {
            const { cpf } = request.params;
            
            const pacienteRetorno = await pacienteServico.removePaciente(cpf);
            if (!pacienteRetorno) 
                return response.status(404).json({ "error": "Paciente não encontrado!!" });
                
                return response.json({ "Message": `Paciente ${id} removido` });
        });

        module.exports = routes;