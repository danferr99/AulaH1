//importando pacote express
const express = require("express");
const { uuid } = require('uuidv4');
const { validate : isUuid } = require("uuid");
//preparar para usar express
const app = express();
app.use(express.json());

const repositories = [];

// 1 parametro o nome da rota
// 2 parametro ação qeu vou fazer função  
// java script arrow function
// (parametros) => {codigos programa fazer}

app.get('/', (request, response) => {
    //codigo funcao

    return response.send(repositories);

});

function calculaImc(peso, altura){

return peso / (altura**2);

}

function classificaIMC (vlrIMC){

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



app.post('/', (request, response) => {

    
    
    const { name, email, cpf, altura, peso } = request.body;
    
    //destruturação
    let imc = calculaImc(peso,altura);
    let classificacao = classificaIMC(imc);
    
    
    const newPaciente = { id: uuid(), name, email, cpf, altura, peso , imc, classificacao};
    repositories.push({ newPaciente });
    return response.json({ newPaciente });



});


app.put('/:id', (request, response) => {
    //route params guid

    const { id } = request.params;
    const { name, email, cpf, altura, peso } = request.body;
    const PacienteProcurado = repositories.findIndex(pacienteIndex => pacienteIndex.id == id);


    console.log(id);
    console.log(request.body);
    console.log(PacienteProcurado);
    console.log(repositories);

    if (PacienteProcurado < 0) {

        return response.status(404).json({ "ERROR": "Paciente não encontrado" });

    }

    const newPaciente = { id, name, email, cpf, altura, peso };
    repositories[PacienteProcurado] = newPaciente;
    return response.json(newPaciente);

});

app.delete('/:id', (request, response) => {

    const { id } = request.params;

    const PacienteProcurado = repositories.findIndex(pacienteIndex => pacienteIndex.id == id);
    if (PacienteProcurado < 0) {

        return response.status(404).json({ "ERROR": `Paciente ${id} não encontrado` });

    }

    repositories.splice(PacienteProcurado, 1);
    return response.json({ "Mensagem": `Paciente ${id} removido` });


});




module.exports = app.listen(3334, () => {
    console.log("Server running");
});