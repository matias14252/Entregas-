const regForm = document.getElementById('registerForm');

regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datForm = new FormData(e.target);
        const userData = Object.fromEntries(datForm);

        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.location.href = '/userlogin';
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        e.target.reset();
    }
});
