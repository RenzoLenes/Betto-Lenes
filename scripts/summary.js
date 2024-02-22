// summary.js
document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalPriceElement = document.getElementById('total-price');

    function renderOrderSummary() {
        const orderData = JSON.parse(localStorage.getItem('order'));

        orderList.innerHTML = '';

        if (orderData) {
            let subtotal = 0;

            Object.values(orderData).forEach(entry => {
                const product = entry.product;
                const quantity = entry.quantity;
                const size = entry.size;
                const productPrice = product.price * quantity;

                const listItem = document.createElement('li');
                listItem.textContent = `${quantity} x ${product.name} - Talla: ${size} - Precio: $${productPrice.toFixed(2)}`;
                orderList.appendChild(listItem);

                subtotal += productPrice;
            });

            let discount = 0;
            subtotal>=300 ? order.setDiscount(0.4) : order.setDiscount(0);
            discount=order.getDiscount()
            const discountAmount = subtotal * discount;
            let total = subtotal - discountAmount;

            subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
            discountElement.textContent = `Descuento (${discount*100}%): $${discountAmount.toFixed(2)}`;
            totalPriceElement.textContent = `Total a Pagar: $${total.toFixed(2)}`;
        } else {
            orderList.textContent = 'No hay productos en el carrito.';
        }
    }

    renderOrderSummary();
});
