const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async function() {
    try {
        const response = await fetch('/api/sessions/logout', {
            method: 'GET'
        });

        if (response.ok) {
            window.location.href = '/userlogin';
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});
