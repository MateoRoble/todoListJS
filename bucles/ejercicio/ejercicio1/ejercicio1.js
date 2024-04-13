
const listaNumeros = document.getElementById("listaNumeros");


for (let i = 1; i <= 10; i++) {

  const nuevoNumero = document.createElement("li");

  nuevoNumero.textContent = [i];
  
  listaNumeros.appendChild(nuevoNumero);
}

