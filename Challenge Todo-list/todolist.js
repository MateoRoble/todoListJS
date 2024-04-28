const obtenerTareaLocalStorage = () => {
    const tareaStorage = localStorage.getItem('listaTareas');
    return tareaStorage ? JSON.parse(tareaStorage) : [];
}

listaTareas = obtenerTareaLocalStorage()

const guardarTareaLocalSotrage = (tareas) => {
    localStorage.setItem('listaTareas', JSON.stringify(tareas))
}

const crearTarea = () => {
    var inputTarea = document.getElementById('inputTarea')
    if (inputTarea.value !== ""){
        const tareaStorage = {contenido: `${inputTarea.value}`, completeda: false}
        listaTareas.push(tareaStorage)
        inputTarea.value= ""
        guardarTareaLocalSotrage(listaTareas)
        var contenedor = document.getElementById('div_tareas');
        contenedor.innerHTML =``;
        mostrarTodos()
    }
}


//BOTONES
const eliminarTarea = (index) => {
    const tarea = obtenerTareaLocalStorage();
    tarea.splice(index,1)
    listaTareas.splice(index, 1)
    guardarTareaLocalSotrage(tarea);
    var contenedor = document.getElementById('div_tareas');
    contenedor.innerHTML =``;
    mostrarTodos()
};
    

const cambiarEstado = (index) => {
    listaTareas[index].completeda = !listaTareas[index].completeda;

    const tarea = obtenerTareaLocalStorage();
    tarea[index].completeda = !tarea[index].completeda;
    guardarTareaLocalSotrage(tarea);
    var contenedor = document.getElementById('div_tareas');
    contenedor.innerHTML =``;
    mostrarTodos()
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

const noFiltrar = () => {
    const todasTareas = document.querySelectorAll('p');
    todasTareas.forEach(parrafo => {
        const divPadre = parrafo.parentNode;
        divPadre.style.display = 'flex';

    });
}
const mostrarTodos = () => {
    const todasTareas = obtenerTareaLocalStorage()
    todasTareas.forEach((tarea, index) => {
    var nuevaTarea = document.createElement("div");
    nuevaTarea.id = `'div_tarea'`
    nuevaTarea.className = "flex mb-4 items-center";
    nuevaTarea.innerHTML = `
        <p id="tarea" class="${tarea.completeda ? 'w-full text-grey-darkest line-through' : 'w-full text-grey-darkest'}">${tarea.contenido}</p>
        <button onclick="cambiarEstado(${index})" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">${
            tarea.completeda ? 'Marcar Sin Completar' : 'Marcar Completada'
          }</button>
        <button onclick="eliminarTarea(${index})" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
        `;
    var contenedor = document.getElementById('div_tareas');
    contenedor.appendChild(nuevaTarea)
    })

};

mostrarTodos()