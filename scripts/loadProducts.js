async function convertirMoneda(precioDolares, monedaSeleccionada) {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${monedaSeleccionada}`;
        const response = await fetch(url);
        const data = await response.json();

        // Obtener el tipo de cambio desde la respuesta
        const tasaCambio = data.usd[monedaSeleccionada];

        if (tasaCambio) {
            // Realizar la conversión
            const precioConvertido = precioDolares * tasaCambio;
            return precioConvertido.toFixed(2);  // Redondear a dos decimales
        } else {
            console.error('No se encontró la tasa de cambio para la moneda seleccionada.');
            return null;
        }

    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error);
        return null;
    }
}

const products = [
    { id:1, name: "CAMISA SLIM FIT AZUL MARINO",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-1.1.png", "./assets/img/producto-1.2.png"] },
    { id:2, name: "CAMISA SLIM FIT CELESTE",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-2.1.png", "./assets/img/producto-2.2.png"] },
    { id:3, name: "CAMISA SLIM FIT VERDE OSCURO",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-3.1.png", "./assets/img/producto-3.2.png"] },
    { id:4, name: "POLERA OVERSIZE GUINDA",size: ["S", "M", "L","XL","XXL"], price: 180, images: ["./assets/img/producto-4.1.png", "./assets/img/producto-4.2.png"] },
    { id:5, name: "POLO OVERSIZE NEGRO",size: ["S", "M", "L","XL","XXL"], price: 100, images: ["./assets/img/producto-5.1.png", "./assets/img/producto-5.2.png"] },
    { id:6, name: "POLO OVERSIZE GRIS",size: ["S", "M", "L","XL","XXL"], price: 100, images: ["./assets/img/producto-6.1.png", "./assets/img/producto-6.2.png"] },
];

let moneda = localStorage.getItem('selectedCurrency');

const productsContainer = document.getElementById("products-container");

products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.classList.add("original-image");
    imageElement.src = product.images[0];
    productDiv.appendChild(imageElement);

    const hoverImageElement = document.createElement("img");
    hoverImageElement.classList.add("hover-image");
    hoverImageElement.src = product.images[1];
    productDiv.appendChild(hoverImageElement);

    const nameElement = document.createElement("p");
    nameElement.classList.add("product-name");
    nameElement.textContent = product.name;
    productDiv.appendChild(nameElement);

    const priceElement = document.createElement("p");
    priceElement.classList.add("product-price")
    priceElement.textContent = product.price + " " + moneda;
    productDiv.appendChild(priceElement);

    productDiv.addEventListener('click', function () {
        // Crear un objeto con la información del producto seleccionado
        const selectedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image1: product.images[0],
            image2: product.images[1],
            size: product.size
        };
    
        // Convertir el objeto a cadena JSON y almacenarlo en localStorage
        
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        
        // Redireccionar a la página de vista de producto
        let ruta=window.location.href = `./pages/product-view.html`;
        console.log(ruta);
    });

    productsContainer.appendChild(productDiv);

});



