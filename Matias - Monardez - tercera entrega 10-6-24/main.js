document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoDOM();
    actualizarTotal();
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const producto = { nombre, precio, imagen, cantidad: 1 };
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoDOM();
    actualizarTotal();
}



// Event listener para los botones de agregar al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const productoDiv = e.target.closest('.producto');
        const nombre = productoDiv.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);
        const imagen = e.target.closest('div').querySelector('img').src;
        agregarAlCarrito(nombre, precio, imagen);
    });
});

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
                <p>Precio unitario: $${producto.precio}</p>
                <label for="cantidad-${index}">Cantidad:</label>
                <input type="number" id="cantidad-${index}" name="cantidad" value="${producto.cantidad}" min="1" max="10">
                <p>Total por producto: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button class="eliminar-btn" data-index="${index}">Eliminar</button>
            `;
            carritoContainer.appendChild(productoDiv);

            const cantidadInput = productoDiv.querySelector(`#cantidad-${index}`);
            cantidadInput.addEventListener('change', () => {
                producto.cantidad = parseInt(cantidadInput.value);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarTotal();
                actualizarCarritoDOM(); // Actualizar nuevamente por si hay cambios en otros productos
            });

            const eliminarBtn = productoDiv.querySelector('.eliminar-btn');
            eliminarBtn.addEventListener('click', () => {
                eliminarDelCarrito(index);
            });
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
    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `$${total}`;
    }
}

// Event listener para el botón de pagar
document.addEventListener('DOMContentLoaded', () => {
    const pagarBtn = document.createElement('button');
    pagarBtn.textContent = 'Pagar';
    pagarBtn.addEventListener('click', () => {
        alert('Redirigiendo al formulario de pago...');
        localStorage.removeItem('carrito');
        actualizarCarritoDOM();
        actualizarTotal();
    });

    const totalContainer = document.getElementById('total-container');
    if (totalContainer) {
        totalContainer.appendChild(pagarBtn);
    }
});


// para botones anterior y siguiente.

document.addEventListener('DOMContentLoaded', (event) => {
    const contents = document.querySelectorAll('.content');
    let currentIndex = 0;

    document.getElementById('next').addEventListener('click', () => {
        contents[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % contents.length;
        contents[currentIndex].classList.add('active');
    });

    document.getElementById('prev').addEventListener('click', () => {
        contents[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + contents.length) % contents.length;
        contents[currentIndex].classList.add('active');
    });
});





