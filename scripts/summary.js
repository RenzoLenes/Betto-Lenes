document.addEventListener('DOMContentLoaded', function () {
    // Obtener el contenedor de resumen del pedido
    const orderContainer = document.querySelector('.order');

    // Función para renderizar el resumen del pedido
    function renderOrderSummary() {
        // Obtener la información del pedido del localStorage
        const orderData = JSON.parse(localStorage.getItem('order'));

        // Limpiar el contenido actual del contenedor
        orderContainer.innerHTML = '';

        // Verificar si hay productos en el pedido
        if (orderData) {
            // Iterar sobre los productos y renderizarlos en el contenedor
            Object.values(orderData).forEach(entry => {
                const product = entry.product;
                const quantity = entry.quantity;
                const size = entry.size; // Asegúrate de tener la propiedad 'size' en tu objeto 'entry'

                // Crear elementos HTML para mostrar cada producto
                const productElement = document.createElement('div');
                productElement.textContent = `${product.name} - Quantity: ${quantity} - Size: ${size}`;

                // Agregar el elemento al contenedor
                orderContainer.appendChild(productElement);
            });
        } else {
            // Mostrar un mensaje si no hay productos en el pedido
            orderContainer.textContent = 'No hay productos en el carrito.';
        }
    }

    // Llamar a la función para renderizar el resumen del pedido
    renderOrderSummary();
});
