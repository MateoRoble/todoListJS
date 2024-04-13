const nombres = ["Manzana", "Banana", "Naranja", "Mandarina", "Frutilla"];

const mostrarElementos = () => {
    let html = "<ul>";
  
    nombres.forEach(function(elemento) {
      html += `<li>${elemento}</li>`;
    });
  
    html += "</ul>";
  
    document.getElementById("listaFrutas").innerHTML = html;
  }
  
mostrarElementos();