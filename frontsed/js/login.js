// login.js
$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();

        const username = $('#login-username').val();
        const password = $('#login-password').val();

        $.ajax({
            url: 'http://localhost:5000/api/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password }),
            success: function(response) {
                alert(response.msg); // Mostrar el mensaje de éxito

                const { token, role } = response;
                // Guardar el token en localStorage
                localStorage.setItem('token', token);

                // Redirigir según el rol
                if (role === 'admin' || role === 'superadmin') {
                    window.location.href = 'dashboard.html'; // Redirigir al dashboard
                } else {
                    window.location.href = 'index.html'; // Redirigir a página de inicio para usuarios comunes
                }
            },
            error: function(xhr) {
                alert(xhr.responseJSON.msg); // Mostrar el mensaje de error
            }
        });
    });
});
