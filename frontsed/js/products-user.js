$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html'; // Redirigir al login si no hay token
        return;
    }

    // Cargar productos
    $(document).ready(function() {
        // Función para cargar los productos
        window.loadProducts = function() {
            $.ajax({
                url: 'http://localhost:5000/api/products',
                method: 'GET',
                success: function(response) {
                    const productList = $('#product-list');
                    productList.empty(); // Limpiar los productos actuales
    
                    // Mostrar los productos como tarjetas (sin botones de editar/eliminar)
                    response.forEach(product => {
                        productList.append(`
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">Precio: $${product.price}</p>
                                        <button class="btn btn-success" disabled>Comprar</button>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                },
                error: function(xhr) {
                    alert(xhr.responseJSON.message); // Mostrar mensaje de error
                }
            });
        };
    
        // Cargar los productos cuando la página se carga
        loadProducts();
    });
});
