// Definimos un array de ejemplo
const miArray = ["Manzana", "Banana", "Cereza", "Damasco", "Uva"];

// Creamos una función para mostrar los elementos del array en el HTML
const mostrarElementos = () => {
  let html = "<ul>";

  // Utilizamos forEach para iterar sobre el array y construir el HTML
  miArray.forEach(function(elemento) {
    html += `<li>${elemento}</li>`;
  });

  html += "</ul>";

  // Mostramos los elementos en el div correspondiente
  document.getElementById("elementosArray").innerHTML = html;
}

// Llamamos a la función para mostrar los elementos al cargar la página
mostrarElementos();