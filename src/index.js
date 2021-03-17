//importando pacotes
const express = require("express");
const { uuid } = require('uuidv4');
const { validate : isUuid } = require("uuid");
const cors = require('cors');
const mongoose = require('mongoose');
const PacienteRepositorio = require('./models/Paciente');



//preparar para usar express e etc...
const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];


mongoose.connect('', {
useNewUrlParser : true,
useUnifiedTopology : true

});

// 1 parametro o nome da rota
// 2 parametro ação qeu vou fazer função  
// java script arrow function
// (parametros) => {codigos programa fazer}

app.get('/',async (request, response) => {
    //codigo funcao
    const retornoPaciente = await PacienteRepositorio.find();
    return response.json(retornoPaciente);
});

function calculaImc(peso, altura){

return peso / (altura*altura);

}

function classificaIMC(vlrIMC){

    if (vlrIMC < 18.5)

return "Peso Baixo";

if (vlrIMC >= 18.5 && vlrIMC < 24.9)

return "Peso Normal";

if (vlrIMC >= 25.0 && vlrIMC < 29.9)

return "Sobrepeso";

if (vlrIMC >= 30.0  && vlrIMC < 34.9)

return "Obesidade Grau - 1 ";

if (vlrIMC >= 35.0  && vlrIMC < 39.9)

return "Obesidade Severa Grau - 2";

if (vlrIMC >= 40.0)

return "Obesidade Severa Grau - 3";


}



app.post('/', async (request, response) => {

    
    
    const { nome, cpf, altura, peso } = request.body;
    console.log(request.body);
    //destruturação
    let imc = calculaImc(peso,altura);
    let classificacao = classificaIMC(imc);
    
    console.log(imc);
    console.log(classificacao);
    const retornoPaciente = await PacienteRepositorio.create({
        id: uuid(), nome, cpf, altura, peso , imc, classificacao

    });
   
    
    return response.json({ retornoAluno });



});


app.put('/:id', (request, response) => {
    //route params guid

    const { id } = request.params;
    const { nome, cpf, altura, peso } = request.body;
    const PacienteProcurado = repositories.findIndex(pacienteIndex => pacienteIndex.newPaciente.id == id);


    console.log(id);
    console.log(request.body);
    console.log(PacienteProcurado);
    console.log(repositories);

    if (PacienteProcurado < 0) {

        return response.status(404).json({ "ERROR": "Paciente não encontrado" });

    }

    const newPaciente = { id, nome, cpf, altura, peso };
    repositories[PacienteProcurado] = newPaciente;
    return response.json(newPaciente);

});

app.delete('/:id', (request, response) => {

    const { id } = request.params;

    const PacienteProcurado = repositories.findIndex(pacienteIndex => pacienteIndex.newPaciente.id == id);
    if (PacienteProcurado < 0) {

        return response.status(404).json({ "ERROR": `Paciente ${id} não encontrado` });

    }

    repositories.splice(PacienteProcurado, 1);
    return response.json({ "Mensagem": `Paciente ${id} removido` });


});




module.exports = app.listen(process.env.PORT || 3334, () => {
    console.log("Server running");
});