const products = [
    { id:1, name: "CAMISA SLIM FIT AZUL MARINO",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-1.1.png", "./assets/img/producto-1.2.png"] },
    { id:2, name: "CAMISA SLIM FIT CELESTE",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-2.1.png", "./assets/img/producto-2.2.png"] },
    { id:3, name: "CAMISA SLIM FIT VERDE OSCURO",size: ["S", "M", "L","XL","XXL"], price: 120, images: ["./assets/img/producto-3.1.png", "./assets/img/producto-3.2.png"] },
    { id:4, name: "POLERA OVERSIZE GUINDA",size: ["S", "M", "L","XL","XXL"], price: 180, images: ["./assets/img/producto-4.1.png", "./assets/img/producto-4.2.png"] },
    { id:5, name: "POLO OVERSIZE NEGRO",size: ["S", "M", "L","XL","XXL"], price: 100, images: ["./assets/img/producto-5.1.png", "./assets/img/producto-5.2.png"] },
    { id:6, name: "POLO OVERSIZE GRIS",size: ["S", "M", "L","XL","XXL"], price: 100, images: ["./assets/img/producto-6.1.png", "./assets/img/producto-6.2.png"] },
];

class Order {
    constructor() {
        this.products = {};
        this.discount = 0;
        this.minDiscountPrice = 0;
        this.total = 0;
    }

    validateProductId(productId) {
        return products.find(product => product.id === productId);
    }

    addProduct(product, size, quantity = 1,image) {
        const productId = product.id

        if (this.validateProductId(productId)) {
            const key = `${productId}-${size}`; // Utilizar productId y size en la clave
            if (!this.products[key]) {
                this.products[key] = {
                    product, size, quantity,image
                };
                console.log(`${quantity} unit(s) of "${product.name}" (Size: ${size}) added to order`);
                this.saveOrderToLocalStorage();
            } else {
                this.products[key].quantity += quantity;
                console.log(`${quantity} unit(s) of "${product.name}" (Size: ${size}) added to order`);
                this.saveOrderToLocalStorage();
            }

        } else {
            console.log("Id not found")
        }
    }

    addProduct1(productId, size, quantity = 1) {

        if (!this.validateProductId(productId)) {
            const key = `${productId}-${size}`; // Utilizar productId y size en la clave
                this.products[key].quantity += quantity;
                this.saveOrderToLocalStorage();

        } else {
            console.log("Id not found")
        }
    }

    saveOrderToLocalStorage() {
        localStorage.setItem('order', JSON.stringify(this.products));
    }

    loadOrderFromLocalStorage() {
        const savedOrder = localStorage.getItem('order');
        if (savedOrder) {
            this.products = JSON.parse(savedOrder);
        }
    }

    removeProductById(productId, size, quantity = 1) {
        const key = `${productId}-${size}`;
        if (this.products[key]) {
            const productEntry = this.products[key];
            if (productEntry) {
                if (productEntry.quantity > quantity) {
                    productEntry.quantity -= quantity;
                    console.log(`${quantity} unit(s) of "${productEntry.product.name}" (Size: ${productEntry.size}) removed from order.`);
                } else {
                    delete this.products[key];
                }
                this.saveOrderToLocalStorage();
            } else {
                console.log('Product not found in the order');
            }
        } else {
            console.log("Product not found in the order");
        }
    }

    calculateDiscount() {
        const subTotal = Object.values(this.products).reduce((acc, entry) => {
            return acc + (entry.product.price * entry.quantity)
        }, 0);
        if (subTotal > 300) {
            console.log(`Recibiste un descuento del 40% por superar los 300$ en tu compra`);
            this.setDiscount(0.4);
        } else {
            this.setDiscount(0);
        }
        return subTotal;
    }

    calculateTotal() {
        this.subTotal=this.calculateDiscount();

        this.total = this.subTotal*(1-this.getDiscount());

        console.log(`Descuento aplicado: ${this.getDiscount() * 100}%`);
        console.log(`Total sin descuento: $${this.subTotal}`);
        console.log(`Total con descuento: $${this.total}`);
    }

    getDiscount() {
        return this.discount;
    }

    setDiscount(_discount) {
        if (typeof _discount === 'number' && _discount >= 0) {
            this.discount = _discount;
        } else {
            console.log('Invalid Discount');
        }
    }

    printProducts() {
        console.log(`Resumen de la compra`);
        Object.values(this.products).forEach(entry => {
            const product = entry.product;
            const quantity = entry.quantity; //quantity se declara ya que product es un objeto de products porque quantity vendria de entry
            console.log(`${product.name}: Cantidad: ${quantity} Precio ${product.price}$`);
        });
    }

    getOrderSummary() {
        return this.products;
    }

}


// Uso de la clase Order
const order = new Order();
order.loadOrderFromLocalStorage();

