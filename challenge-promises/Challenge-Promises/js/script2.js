
//ANDA
// Función para obtener los jugadores del localStorage
var listaPosiciones = [ 'Delantero', 'Centrocampista', 'Defensa', 'Portero']
console.log(listaPosiciones)
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
        
        const posiciones = ['Delantero', 'Defensa', 'Mediocampista', 'Portero'];
        
        let selectPosicionHTML = '<div><label class="text-gray-600 dark:text-gray-400">POSICIÓN</label>';
        selectPosicionHTML += '<select id="posicion" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100">';
        
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
            const nombre = document.getElementById('nombre').value;
            const edad = document.getElementById('edad').value;
            const posicion = document.getElementById('posicion').value;
            const estado = document.getElementById('estado').value;
            
            const { titulares, porteros } = contarTitularesYPorteros(jugadores);

            if (estado === 'Titular') { // Si el jugador es titular
                if (titulares >= 11) {
                    alert('No puede haber más de 11 jugadores titulares.');
                    return;
                }
                if (titulares == 10 && porteros < 1){
                    alert('Necesitas un portero')
                }
                if (posicion === 'Portero' && porteros >= 1) {
                    alert('No puede haber más de un portero titular.');
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
    const listaJugadores = obtenerJugadoresLocalStorage()
    const divLista = document.getElementById('tablaJugadores')
    divLista.innerHTML = ""
    var primeraFila = document.createElement('tr')
    primeraFila.innerHTML = `<td>Orden</td> <td>Nombre</td> <td>Edad</td> <td>Posicion</td> <td>Estado</td>`
    divLista.appendChild(primeraFila)
    listaJugadores.forEach((jugador,index) => {
        var lista = document.createElement('tr')
        lista.innerHTML = `<td>${index+1}</td> <td>${jugador.nombre}</td> <td>${jugador.edad}</td> <td>${jugador.posicion}</td> <td>${jugador.estado}</td>`
        divLista.appendChild(lista)
    });
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
    // Implementación para asignar una nueva posición a un jugador
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
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
