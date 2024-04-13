// Solicitar al usuario ingresar un número
const numero = parseInt(prompt("Ingrese un número:"));

// Verificar si el número es par o impar
if (numero % 2 === 0) {
    document.getElementById("resultado").innerText = `El número ingresado (${numero}) es par.`;
} else {
    document.getElementById("resultado").innerText = `El número ingresado (${numero}) es impar.`;
}