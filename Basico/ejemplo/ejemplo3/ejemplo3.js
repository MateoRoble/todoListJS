// Solicitar al usuario ingresar tres números
const num1 = parseFloat(prompt("Ingrese el primer número:"));
const num2 = parseFloat(prompt("Ingrese el segundo número:"));
const num3 = parseFloat(prompt("Ingrese el tercer número:"));

// Determinar el mayor de los tres números
let mayor;

console.log(-10 > -100);
if (num1 >= num2 && num1 >= num3) {
    mayor = num1;
} else if (num2 >= num1 && num2 >= num3) {
    mayor = num2;
} else {
    mayor = num3;
}

document.getElementById("resultado").innerText = `El mayor de los tres números ingresados es: ${mayor}`;
