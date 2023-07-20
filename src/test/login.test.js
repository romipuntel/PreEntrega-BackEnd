import { login } from "../login.js";

let pruebasPasadas = 0
const pruebasTotales = 5


// 1. password vacio
const response1 = login('userCoder')
if(response1==='No se ha proporcionado un password'){
    console.log('Test 1 paso');
    pruebasPasadas++
} else {
    console.log('Test 1 fallo');
}

// 2. user vacio
const response2 = login(null,'123')
if(response2==='No se ha proporcionado un usuario'){
    console.log('Test 2 paso');
    pruebasPasadas++
} else {
    console.log('Test 2 fallo');
}

// 3. password incorrecto
const response3 = login('userCoder','1234')
if(response3==='Password incorrecta'){
    console.log('Test 3 paso');
    pruebasPasadas++
} else {
    console.log('Test 3 fallo');
}

// 4.user incorrecto
const response4 = login('userCoderIncorrecto','123')
if(response4==='Credenciales incorrectas'){
    console.log('Test 4 paso');
    pruebasPasadas++
} else {
    console.log('Test 4 fallo');
}

// 5. user y password correctos
const response5 = login('coderUser','123')
if(response5==='logueado'){
    console.log('Test 5 paso');
    pruebasPasadas++
} else {
    console.log('Test 5 fallo');
}

console.log(`Pasaron ${pruebasPasadas} test de un total de ${pruebasTotales}`);