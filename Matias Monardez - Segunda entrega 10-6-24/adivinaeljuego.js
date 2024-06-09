juegoAdivinanzaNumero()
function juegoAdivinanzaNumero() {
    let numeroOculto = Math.round(Math.random() * 100) + 1
    const intentosMaximos = 10
    let intentosUsuario

    for (let intento = 1; intento <= intentosMaximos; i++) {
        intentosUsuario = Number(prompt("Intenta adivinar el número (entre 1 y 100). Te quedan " + (intentosMaximos - intento) + " intentos:"))

        if (isNaN(intentosUsuario) || intentosUsuario < 1 || intentosUsuario > 100) {
            alert("Ingresa un número válido entre 1 y 100.")
            continue;
        } else if (intentosUsuario === numeroOculto) {
            alert("¡Felicidades! ¡Adivinaste el número! " + numeroOculto + " 🎉")
            break
        }
        else if (intento === intentosMaximos) {
            alert("Se han acabado los intentos. El número era " + numeroOculto);
        } else if (intentosUsuario < numeroOculto) {
            alert("El número es más alto. 📈")
        } else {
            alert("El número es más bajo. 📉")
        }
    }

    jugarOtraVez()
}

function jugarOtraVez() {
    const respuesta = prompt("¿Quieres jugar otra vez? (Sí/No)").toLowerCase()
    if (respuesta === "sí" || respuesta === "si") {
        juegoAdivinanzaNumero()
    } else {
        alert("¡Gracias por jugar! Hasta la próxima.")
    }
}