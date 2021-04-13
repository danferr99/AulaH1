const { Router, request } = require('express');
const vacinaServico = require('../services/vacinaServico');

const autenticacaoJWT = require('../services/authService');
//preparar parar usar o express;

const routes2 = Router();
//autenticacaoJWT.verificarToken
routes2.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const vacinaRetorno = await vacinaServico.buscaVacina();
    return response.json(vacinaRetorno);
});

routes2.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const vacinaRetorno = await vacinaServico.buscaPacientePorCpf(cpf);
    return response.json(vacinaRetorno);
});


    routes2.post('/', autenticacaoJWT.verificarToken, async (request, response) => {

    
    
        const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf } = request.body;
        console.log(request.body);
        
        
        const novaVacina = {  nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
        const vacinaRetorno = await vacinaServico.insereVacina(novaVacina);
        if (vacinaRetorno === null){

            response.status(500).json({ "ERROR": "Pessoa já está na fila. Paciente não foi inserido!!" });
        }
        return response.status(201).json({ vacinaRetorno });
    
        });


        routes2.put('/vacina/:cpf', async (request, response) => {
            //route params guid
        
            const { cpf} = request.params;
            const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao} = request.body;
            const vacinaAtualizar = {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
            const vacinaRetorno = await vacinaServico.atualizaVacina(vacinaAtualizar);      
            if (!vacinaRetorno)
        return response.status(404).json({ "error": "Paciente não encontado!" });

    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
                
               
        
        });
        
       
        
        routes2.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
           
            const { cpf } = request.params;
           console.log(cpf); 
            const vacinaRetorno = await vacinaServico.removeVacina(cpf);
            if (!vacinaRetorno) 
             response.status(404).json({ "error": "Paciente não encontrado!!" });
        
                
                return response.status(200).json({ "Message": `Pessoa ${cpf} removida da fila de Vacinação!!!` });
        });

        module.exports = routes2;