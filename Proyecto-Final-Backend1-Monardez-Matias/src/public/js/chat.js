const socket = io();

const chatButton = document.getElementById('chatButton');
const paragraphMessages = document.getElementById('paragraphMessages');
const valInput = document.getElementById('chatBox');
let user;

Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su email",
    input: "text",
    inputValidator: (valor) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!valor) {
            return "Ingrese su email";
        } else if (!emailRegex.test(valor)) {
            return "Ingrese un email válido";
        }

        return null;
    },
    allowOutsideClick: false 
}).then(resultado => {
    user = resultado.value
    console.log(user)
});

chatButton.addEventListener('click', () => {
    if (valInput.value.trim().length > 0) {
        socket.emit('message', { user: user, message: valInput.value });
        valInput.value = "";
    }
});

socket.on('messages', (messagesArray) => {
    paragraphMessages.innerHTML = "";
    messagesArray.forEach(message => {
        paragraphMessages.innerHTML += `<p>${message.postTime}: El usuario ${message.user} escribió: ${message.message} </p>`
    });
});
