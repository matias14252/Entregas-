const socket = io() //Instancio socket.io

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
let user =

    Swal.fire({
        title: "Inicio de Sesion",
        input: "text",
        text: "Por favor ingrese su nombre de usuario para continuar",
        inputValidator: (valor) => {
            return !valor && 'Ingrese un valor valido'
        },
        allowOutsideClick: false
    }).then(resultado => {
        user = resultado.value
        console.log(user)
    })

//Evento change cuando sucede algun cambio en el input (pj cuando den enter)
chatBox.addEventListener('change', (e) => {

    if (chatBox.value.trim().length > 0) { //Si no me envio una cadena vacia
        //Envio un mensaje al servidor 
        socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
        chatBox.value = ""
    }

})

socket.on('respuesta', info => {
    messageLogs.innerHTML = ""
    //Recorro el array de mensajes y lo muestro
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})