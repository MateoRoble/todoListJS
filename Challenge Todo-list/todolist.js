const insertarTarea = () => {
    var inputTarea = document.getElementById('inputTarea')
    if (inputTarea.value !== ""){
        var nuevaTarea = document.createElement("div");
        nuevaTarea.id = `'div_tarea'`
        nuevaTarea.className = "flex mb-4 items-center";
        nuevaTarea.innerHTML = `
            <p id="tarea" class="w-full text-grey-darkest">${inputTarea.value}</p>
            <button onclick="tacharTarea(this)" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
            <button onclick="destacharTarea(this)" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">NotDone</button>
            <button onclick="eliminarTarea(this)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
            `;
        var contenedor = document.getElementById('div_tareas');
        var ultimoDiv = contenedor.lastElementChild;
        contenedor.insertBefore(nuevaTarea, ultimoDiv.nextSibling)
        inputTarea.value= ""
    }
}

//BOTONES
const eliminarTarea = (elemento) => {
        const tareaPadre = elemento.parentNode;
        tareaPadre.remove();
};
    
const tacharTarea = (elemento) => {
        const parrafo = elemento.parentNode.querySelector("#tarea");
        parrafo.classList.add("line-through");
};

const destacharTarea =  (elemento) => {
        const parrafo = elemento.parentNode.querySelector("#tarea");
        parrafo.classList.remove("line-through");
}

//FILTRO
const filtrarTachados = () => {
    const todasTareas = document.querySelectorAll('p');
    todasTareas.forEach(parrafo => {
        const divPadre = parrafo.parentNode; 
        if (parrafo.classList.contains('line-through')) {
            divPadre.style.display = 'flex';
        } else {
            divPadre.style.display = 'none';
        }
    });
};

const filtrarNoTachados = () => {
    const todasTareas = document.querySelectorAll('p');
    todasTareas.forEach(parrafo => {
        const divPadre = parrafo.parentNode; 
        if (!parrafo.classList.contains('line-through')) {
            divPadre.style.display = 'flex';
        } else {
            divPadre.style.display = 'none';
        }
    });
};

const mostrarTodos = () => {
    const todasTareas = document.querySelectorAll('p');
    todasTareas.forEach(parrafo => {
        const divPadre = parrafo.parentNode;
        divPadre.style.display = 'flex';

    });
};