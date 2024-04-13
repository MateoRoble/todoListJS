// Solicitamos al usuario que ingrese un número inicial para la cuenta regresiva
let numeroInicial = parseInt(prompt("Ingrese un número para iniciar la cuenta regresiva:")) || 0;

let cuentaRegresivaHTML = "<p>Iniciando cuenta regresiva...</p>";

// Utilizamos un bucle while para realizar la cuenta regresiva
while (numeroInicial > 0) {
  cuentaRegresivaHTML += `<p>${numeroInicial}</p>`;
  numeroInicial--; // Decrementamos el número en cada iteración
}

cuentaRegresivaHTML += "<p>¡Cuenta regresiva completada!</p>";

// Mostramos la cuenta regresiva en el div correspondiente
document.getElementById("cuentaRegresiva").innerHTML = cuentaRegresivaHTML;
