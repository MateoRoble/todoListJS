// Función para obtener los jugadores del localStorage
let posiciones = ['Delantero', 'Defensa', 'Mediocampista', 'Portero'];

const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        const divFormulario = document.getElementById('divForm');
        let jugadores = obtenerJugadoresLocalStorage();
        
        let selectPosicionHTML = '<div><label class="text-gray-600 dark:text-gray-400">POSICIÓN</label>';
        selectPosicionHTML += '<select id="pos" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100">';
        
        posiciones.forEach(posicion => {
          selectPosicionHTML += `<option value="${posicion}">${posicion}</option>`;
        });
        
        selectPosicionHTML += '</select></div>';
        
        let selectTitularHTML = '<div><label class="text-gray-600 dark:text-gray-400">ESTADO</label>';
        selectTitularHTML += '<select id="estado" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100">';
        selectTitularHTML += '<option>Titular</option>';
        selectTitularHTML += '<option>Suplente</option>';
        selectTitularHTML += '<option>Lesionado</option>';
        selectTitularHTML += '</select></div>';
        
        const formulario = document.createElement('form');
        formulario.id = 'playerForm';
        formulario.innerHTML = `
        <div class="flex justify-center mt-20 px-8">
            <div class="max-w-2xl">
                <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                    <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">DATOS DEL JUGADOR:</h2>
                    <div id="formulario" class="flex flex-col gap-2 w-full border-gray-400">
                        <div>
                            <label class="text-gray-600 dark:text-gray-400">NOMBRE</label>
                            <input id="nombre" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100" type="text">
                        </div>
                        <div>
                            <label class="text-gray-600 dark:text-gray-400">EDAD</label>
                            <input id="edad" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100" type="text">
                        </div>
                        ${selectPosicionHTML}
                        ${selectTitularHTML}
                        <div class="flex justify-end">
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Agregar Jugador</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        divFormulario.appendChild(formulario);

        function contarTitularesYPorteros(jugadores) {
            let titulares = 0;
            let porteros = 0;
            jugadores.forEach(jugador => {
                if (jugador.estado === 'Titular') {
                    titulares++;
                    if (jugador.posicion === 'Portero') {
                        porteros++;
                    }
                }
            });
            return { titulares, porteros };
        }
        
        document.getElementById('playerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const edad = document.getElementById('edad').value;
            const posicion = document.getElementById('pos').value;
            const estado = document.getElementById('estado').value;
            
            if (!nombre) {
                alert('El nombre no puede estar vacío.');
                return;
            }

            const edadNum = parseInt(edad, 10);
            if (isNaN(edadNum) || edadNum < 15 || edadNum > 60) {
                alert('La edad debe ser un número entre 15 y 60.');
                return;
            }

            const { titulares, porteros } = contarTitularesYPorteros(jugadores);

            if (estado === 'Titular') { // Si el jugador es titular
                if (titulares >= 11) {
                    alert('No puede haber más de 11 jugadores titulares.');
                    return;
                }
                if (posicion === 'Portero' && porteros >= 1) {
                    alert('No puede haber más de un portero titular.');
                    return;
                }
                if (titulares === 10 && porteros === 0 && posicion !== 'Portero') {
                    alert('El último jugador titular debe ser un portero.');
                    return;
                }
            }

            const jugador = { nombre, edad, posicion, estado };
            const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
            if (jugadorExistente) {
                window.alert('El jugador ya está en el equipo')
                throw new Error('El jugador ya está en el equipo.');
                
            }
            else{
            jugadores.push(jugador);
            guardarJugadoresLocalStorage(jugadores);
           // window.alert('Jugador Agregado con Exito')
            console.log(jugadores);
            }
            // Opcional: Limpiar los campos del formulario después de agregar el jugador
            document.getElementById('playerForm').reset();
            listarJugadores()
        });
        await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {

        const listaJugadores = obtenerJugadoresLocalStorage();
        const divLista = document.getElementById('tablaJugadores');
        divLista.innerHTML = "";
        var primeraFila = document.createElement('tr');
        primeraFila.innerHTML = `<td>Orden</td> <td>Nombre</td> <td>Edad</td> <td>Posicion</td> <td>Estado</td> <td>Acciones</td>`;
        divLista.appendChild(primeraFila);
        listaJugadores.forEach((jugador, index) => {
            var lista = document.createElement('tr');
            lista.innerHTML = `<td>${index+1}</td> <td>${jugador.nombre}</td> <td>${jugador.edad}</td> <td>${jugador.posicion}</td> <td>${jugador.estado}</td>`;
            
            // Añadir opciones para cambiar la posición
            const selectPosicion = document.createElement('select');
            selectPosicion.innerHTML = `<option value="Null">Cambiar posicion</option> <option value="Delantero">Delantero</option> <option value="Defensa">Defensa</option> <option value="Mediocampista">Mediocampista</option> <option value="Portero">Portero</option>`;
            selectPosicion.addEventListener('change', function() {
                jugador.posicion = this.value;
                guardarJugadoresLocalStorage(listaJugadores);
                listarJugadores();
            });
            const tdPosicion = document.createElement('td');
            tdPosicion.appendChild(selectPosicion);
            lista.appendChild(tdPosicion);

            const buttonBorrar = document.createElement('button');
            buttonBorrar.textContent = 'Borrar';
            buttonBorrar.addEventListener('click', function() {
                listaJugadores.splice(index, 1);
                guardarJugadoresLocalStorage(listaJugadores);
                listarJugadores();
            });
            const tdBorrar = document.createElement('td');
            tdBorrar.appendChild(buttonBorrar);
            lista.appendChild(tdBorrar);
            
            divLista.appendChild(lista);
        });
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async () => {
            // Función para crear y gestionar el formulario de búsqueda y cambio de jugadores
                const divCambio = document.getElementById('divCambio');
    
                // Crear formulario inicial
                const form = document.createElement('form');
                form.id = 'searchForm';
                form.innerHTML = `
                    <div class="max-w-2xl">
                        <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                            <label class="text-gray-600 dark:text-gray-400">Nombre del jugador titular:</label>
                            <input type="text" id="nombreTitular" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100" required>
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Buscar</button>
                        </div>
                    </div>
                `;
    
                divCambio.appendChild(form);
    
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const nombreTitular = document.getElementById('nombreTitular').value.trim();
                    const jugadores = obtenerJugadoresLocalStorage();
                    const jugadorTitular = jugadores.find(jugador => jugador.nombre === nombreTitular);
    
                    if (!jugadorTitular) {
                        alert('Jugador no existe');
                        return;
                    }
    
                    if (jugadorTitular.estado !== 'Titular') {
                        alert('El jugador no es titular');
                        return;
                    }
                    alert('Jugador encontrado')
                    // Crear segundo input para buscar suplente
                    const suplenteForm = document.createElement('form');
                    suplenteForm.id = 'suplenteForm';
                    suplenteForm.innerHTML = `
                        <div class="max-w-2xl">
                            <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                                <label class="text-gray-600 dark:text-gray-400">Nombre del jugador suplente:</label>
                                <input type="text" id="nombreSuplente" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100" required>
                                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Realizar Cambio</button>
                            </div>
                        </div>
                    `;
    
                    // Remover el formulario anterior y añadir el nuevo
                    divCambio.appendChild(suplenteForm);
    
                    suplenteForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const nombreSuplente = document.getElementById('nombreSuplente').value.trim();
                        const jugadorSuplente = jugadores.find(jugador => jugador.nombre === nombreSuplente);
    
                        if (!jugadorSuplente) {
                            alert('Jugador suplente no existe');
                            return;
                        }
    
                        if (jugadorSuplente.estado !== 'Suplente') {
                            alert('El jugador no es suplente');
                            return;
                        }
    
                        // Cambiar las condiciones de los jugadores
                        jugadorTitular.estado = 'Suplente';
                        jugadorSuplente.estado = 'Titular';
    
                        // Guardar cambios en el localStorage
                        guardarJugadoresLocalStorage(jugadores);
    
                        alert(`Cambio Realizado: Sale: ${jugadorTitular.nombre}  //  Entra: ${jugadorSuplente.nombre} `);
                        // Opcional: Reiniciar el formulario para nuevas búsquedas
                        divCambio.innerHTML = '';
                    });
                });
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
