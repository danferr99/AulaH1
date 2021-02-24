const app = require('../index');
const request = require ('supertest');
const { validate : isUuid } = require("uuid");
//Nome que descreve o teste
//Ação que vou fazer do teste

    describe("Teste 1 - Criar novo paciente", () =>{
        it ("POST", async () =>{
        
            //Chamada API metodo POST
            const response = await request(app)
            .post("/")
            .send({

                "name" : "Daniel",
                "cpf" : 123,
                "peso" : 80,
                "altura" : 1.80,
               
            })
                .expect(200);
                expect(isUuid(response.body.newPaciente.id)).toBe(true);
                expect(response.body).toMatchObject({

                "newPaciente": {
                        "name" : "Daniel",
                        "cpf" : 123,
                        "peso" : 80,
                        "altura" : 1.80,
                        "imc" : ,
                        "classificacao" : ""


                }
            

                });
             });
         });



