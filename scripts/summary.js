document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now-button');

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
                    <p>${productPrice.toFixed(2)} USD</p>
                    <button class="add-product" data-product-id="${product.id}" data-product-name="${product.name}" data-product-size="${size}"><i class="bi bi-plus-square"></i></button>
                    <button class="delete-product" data-product-id="${product.id}" data-product-name="${product.name}" data-product-size="${size}"><i class="bi bi-trash3"></i></button>
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
            discountElement.textContent = `Discount (${discount*100}%): $${discountAmount.toFixed(2)}`;
            totalPriceElement.textContent = `Total to pay: $${total.toFixed(2)}`;

            buyNowButton.addEventListener('click', function () {
                payTotal(total);
            });

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
                    const productName = this.getAttribute('data-product-name');
                    const productSize = this.getAttribute('data-product-size');
                    order.removeProductById(productId, productSize);
                    Swal.fire({
                        icon: 'success',
                        title: 'Product removed from the cart',
                        text: `${productName} ${productSize} has been successfully removed from the cart.`,
                    });
                    renderOrderSummary(); // Volver a renderizar el resumen después de la eliminación
                });
            });
        } else {
            orderList.textContent = 'No hay productos en el carrito.';
        }
    }

    function payTotal(total) {
        Swal.fire({
            title: 'Total to Pay',
            text: `The total amount to pay is: $${total.toFixed(2)}`,
            showCancelButton: true,
            confirmButtonText: 'Pay',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise((resolve) => {
                    // Simulando el proceso de carga
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: `The payment was successful!`,
                });
            }
        });
    }
    



    renderOrderSummary();
});


