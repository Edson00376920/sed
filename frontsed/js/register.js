// register.js
$(document).ready(function() {
    $('#register-form').submit(function(e) {
        e.preventDefault();

        const username = $('#reg-username').val();
        const password = $('#reg-password').val();
        const role = $('#reg-role').val(); // Obtener el rol seleccionado

        $.ajax({
            url: 'http://localhost:5000/api/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password, role }),
            success: function(response) {
                alert(response.msg); // Mostrar el mensaje de éxito
                if (response.msg === 'Usuario registrado exitosamente') {
                    window.location.href = 'index.html'; // Redirigir al login después de registrar
                }
            },
            error: function(xhr) {
                alert(xhr.responseJSON.msg); // Mostrar el mensaje de error
            }
        });
    });
});
