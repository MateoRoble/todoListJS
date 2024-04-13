let n1 = 0

let n2 = 0


n1 = parseInt(prompt ('ingrese un numero: '))

n2 = parseInt(prompt ('ingrese otro numero '))


if (n1 > n2 ){
    window.alert(`el numero ${n1} es mayor`)
}  else if (n1 == n2) {
    window.alert('los numeros son iguales')
} else {
    window.alert(`el numero ${n2} es mayor`)
}
