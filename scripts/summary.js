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
                const image=product.image;

                const listItem = document.createElement('li');
                listItem.classList.add('order-product');
                listItem.innerHTML = `
                <img src="${image}" alt="">
                <div class="product-detail">
                    <p>${product.name}</p>
                    <p>QUANTITY: ${quantity}</p>
                    <p>SIZE: ${size}</p>
                    <p>${productPrice.toFixed(2)} PEN</p>
                    <button class="add-product" data-product-id="${product.id}" data-product-size="${size}"><i class="bi bi-plus-square"></i></button>
                    <button class="delete-product" data-product-id="${product.id}" data-product-size="${size}"><i class="bi bi-trash3"></i></button>
                </div>
                `;
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

            const addButtons = document.querySelectorAll('.add-product');
            addButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productId = this.getAttribute('data-product-id');
                    console.log(productId);
                    const productSize = this.getAttribute('data-product-size');
                    order.addProduct1(productId, productSize);
                    renderOrderSummary(); // Volver a renderizar el resumen después de la eliminación
                });
            });


            const deleteButtons = document.querySelectorAll('.delete-product');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productId = this.getAttribute('data-product-id');
                    const productSize = this.getAttribute('data-product-size');
                    order.removeProductById(productId, productSize);
                    renderOrderSummary(); // Volver a renderizar el resumen después de la eliminación
                });
            });
        } else {
            orderList.textContent = 'No hay productos en el carrito.';
        }
    }

    renderOrderSummary();
});
