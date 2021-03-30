module.exports.imc = function (peso, altura) {

    return  peso / (altura*altura);


}

module.exports.classificacao = function(vlrIMC) { 

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