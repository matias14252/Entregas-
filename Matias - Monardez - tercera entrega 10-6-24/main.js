// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = { nombre, precio, imagen };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoDOM();
    actualizarTotal();
}

// Función para actualizar el carrito en el DOM
function actualizarCarritoDOM() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    if (carritoContainer) {
        carritoContainer.innerHTML = '';
        carrito.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>U$D${producto.precio.toFixed(2)}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            carritoContainer.appendChild(productoDiv);
        });
    }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoDOM();
    actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const totalElement = document.getElementById('total');
    totalElement.textContent = `U$D${total.toFixed(2)}`;
}

// Inicializar el carrito en el DOM al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoDOM();
    actualizarTotal();
});

// Event listener para los botones de agregar al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);
        const imagen = e.target.closest('div').querySelector('img').src;
        agregarAlCarrito(nombre, precio, imagen);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let offset = 0;

    prevButton.addEventListener('click', () => {
        if (offset > 0) {
            offset -= 100;
            carousel.style.transform = `translateX(-${offset}%)`;
        }
    });

    nextButton.addEventListener('click', () => {
        if (offset < 300) { // 300 because we have 4 items, and each takes 25%
            offset += 100;
            carousel.style.transform = `translateX(-${offset}%)`;
        }
    });
});


//funcion de compra
// solo esto me falta ..


