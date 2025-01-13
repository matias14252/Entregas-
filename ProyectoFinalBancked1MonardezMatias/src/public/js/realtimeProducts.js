const socket = io();
const form = document.getElementById('idForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const prod = Object.fromEntries(datForm);
    socket.emit('newProduct', prod);
    e.target.reset();
});

socket.on('prods', (newProds) => {
    paragraphProds.innerHTML = "";
    newProds.forEach(prod => {
        paragraphProds.innerHTML += `<p>Título: ${prod.title} Descripción: ${prod.description} Precio: ${prod.price} Código: ${prod.code} Stock: ${prod.stock} Categoría: ${prod.category} Estado: ${prod.status} Id: ${prod._id}</p>`
    });
});

socket.on('error', (errorData) => {
    console.log({ error: `${errorData.error}` } );
});




