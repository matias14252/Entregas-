async function addToCart(productId, cartId, quantity) {
    try {
        quantity = parseInt(quantity);

        if (!cartId) {
            window.location.replace('/userlogin');
            return;
        }
        
        const response = await fetch(`/api/cart/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('No se pudo agregar producto al carrito:', errorData);
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
}


    


