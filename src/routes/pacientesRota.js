const { Router, request } = require('express');
const pacienteServico = require('../services/pacienteServico');

const routes = Router();

//preparar parar usar o express;

routes.get('/', async (request, response ) => {

    const retornoPaciente = await pacienteServico.buscaPaciente();
    return response.json(retornoPaciente);


});


    routes.post('/', async (request, response) => {

    
    
        const { nome, cpf, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
        console.log(request.body);
        //destruturação
        
        
        const novoPaciente = { nome, cpf, altura, peso , imc: 0, classificacao : '', dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid};
        const retornoPaciente = await pacienteServico.inserePaciente(novoPaciente);
        return response.json( {retornoPaciente} );
    
        });


        routes.put('/:id', async (request, response) => {
            //route params guid
        
            const { id } = request.params;
            const { nome, cpf, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
            
        
            const PacienteRetorno = await PacienteRepositorio.find({cpf : id});
            if (PacienteRetorno == null) {
        
                return response.status(404).json({ "ERROR": "Paciente não encontrado" });
        
            }
        
            const PacienteAtualizado = await PacienteRepositorio.updateOne({ cpf: id },
                {
                    $set:
                    {
                         nome
                    }
                });
        
            return response.json(PacienteAtualizado);
        
        });

        routes.delete('/:id', async (request, response) => {
            const { id } = request.params;
            //id enviado existe no array?
        
        
            const PacienteRetorno = await PacienteRepositorio.find({ cpf: id });
            console.log(PacienteRetorno);
            if (PacienteRetorno.length === 0) {
                return response.status(404).json({ "error": "Paciente não encontrado!!" });
            }
            const PacienteRemovido = await PacienteRepositorio.deleteOne({ cpf: id });
        
            return response.json({ "Message": `Paciente ${id} removido` });
        });

        module.exports = routes;