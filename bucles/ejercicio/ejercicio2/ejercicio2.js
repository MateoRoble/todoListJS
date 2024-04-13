let n = 0;
var suma = 0
const listaNumeros = document.getElementById("listaNumeros");

while (n < 100){
    n++;

    var suma = suma + n;
    
}

const sumatoria = document.createElement("h2")

sumatoria.textContent = [suma];

listaNumeros.appendChild(sumatoria);