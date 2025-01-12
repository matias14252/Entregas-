const logForm = document.getElementById('loginForm');

logForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datForm = new FormData(e.target);
        const userData = Object.fromEntries(datForm);

        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.location.href = '/home';
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error('Error en login:', error);
    } finally {
        e.target.reset();
    }
});
