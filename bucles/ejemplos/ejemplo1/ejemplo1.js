// Array de nombres
const nombres = ["Juan", "María", "Pedro", "Ana", "Luis"];

// Obtener el elemento UL donde se mostrarán los nombres
const listaNombres = document.getElementById("listaNombres");

// Utilizar un bucle for para crear elementos LI con los nombres y agregarlos a la lista
for (let i = 0; i < nombres.length; i++) {
    // Crear un nuevo elemento LI
    const nuevoNombre = document.createElement("li");
    
    // Asignar el nombre del array al elemento LI
    nuevoNombre.textContent = nombres[i];
    
    // Agregar el nuevo elemento LI a la lista
    listaNombres.appendChild(nuevoNombre);
}