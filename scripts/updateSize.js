let moneda = "PEN"
let selectedSize = "";

document.addEventListener('DOMContentLoaded', function () {
    // Recuperar la información del producto del localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Hacer algo con la información del producto, como actualizar la interfaz de usuario
    const productId = selectedProduct.id;
    const productName = selectedProduct.name;
    const productPrice = selectedProduct.price;
    let productImage = selectedProduct.image1;
    let productImageHover = selectedProduct.image2;
    const productSize = selectedProduct.size;
    productImage = '.' + productImage;
    productImageHover = '.' + productImageHover;
    // Actualizar la interfaz de usuario con la información del producto
    document.querySelector('.header').textContent = productName;
    document.querySelector('.price').textContent = `${productPrice} ${moneda}`;

    // Cargar las imágenes en la plantilla
    const slideImages = document.querySelectorAll('.slides .slide img');
    slideImages[0].src = productImage;
    slideImages[1].src = productImageHover;

    // Agregar botones de tamaño
    const optionsContainer = document.querySelector('.options');
    productSize.forEach(size => {
        const button = document.createElement('button');
        button.classList.add('btn', 'white', 'option');
        button.textContent = size;
        button.addEventListener('click', function () {
            // Lógica para manejar el tamaño seleccionado
            console.log(`Tamaño seleccionado: ${size}`);
        });
        optionsContainer.appendChild(button);
    });

    // Asignar el evento clic a los botones de tamaño
    const options = document.querySelectorAll('.options .option');
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            // Reiniciar estilos de todos los botones de opciones
            options.forEach(function (otherOption) {
                otherOption.classList.remove('selected');
            });

            // Aplicar estilo al botón de opción seleccionado
            option.classList.add('selected');
            selectedSize = option.textContent;
        });
    });

    // Asignar el evento clic a los botones de tamaño (puedes mantener este código si ya lo has agregado)

    // ... Resto del código

    // Asociar el evento de clic al botón "ADD TO CART"
    // Asociar el evento clic al botón "ADD TO CART"
    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Verificar que se haya seleccionado una talla
        const selectedSizeElement = document.querySelector('.options .option.selected');
        if (!selectedSizeElement) {
            console.log("Por favor, selecciona una talla antes de añadir al carrito.");
            return; // Detener la ejecución si no se ha seleccionado una talla
        }

        const selectedSize = selectedSizeElement.textContent;

        // Obtener la información del producto seleccionado
        const selectedProduct = {
            id: productId,
            name: productName,
            price: productPrice,
            // Otros datos del producto según sea necesario
        };

        // Añadir el producto al carrito con la cantidad deseada
        order.addProduct(selectedProduct,selectedSize, 1);

        console.log(`Producto añadido al carrito:\n${JSON.stringify(selectedProduct, null, 2)}`);
    });

});
