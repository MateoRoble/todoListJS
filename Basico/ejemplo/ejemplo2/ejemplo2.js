// Solicitar al usuario ingresar dos números
const num1 = parseFloat(prompt("Ingrese el primer número:"));
const num2 = parseFloat(prompt("Ingrese el segundo número:"));

// Calcular la suma de los números
const suma = num1 + num2;

// Determinar si la suma es positiva, negativa o cero
if (suma > 0) {
    document.getElementById("resultado").innerText = `El resultado de (${num1} + ${num2}) es positiva.`;
} else if (suma < 0) {
    document.getElementById("resultado").innerText = `El resultado de (${num1} + ${num2}) es negativa.`;
} else {
    document.getElementById("resultado").innerText = `El resultado de (${num1} + ${num2}) es cero.`;
}