const products = [
    { id: 1, name: "CAMISA SLIM FIT AZUL MARINO", size: ["S", "M", "L"], price: 120 },
    { id: 2, name: "CAMISA SLIM FIT CELESTE", size: ["S", "M", "L"], price: 120 },
    { id: 3, name: "CAMISA SLIM FIT VERDE OSCURO", size: ["S", "M", "L"], price: 120 },
    { id: 4, name: "POLERA OVERSIZE GUINDA", size: ["S", "M", "L"], price: 180 },
    { id: 5, name: "POLO OVERSIZE NEGRO", size: ["S", "M", "L"], price: 100 },
    { id: 6, name: "POLO OVERSIZE GRIS", size: ["S", "M", "L"], price: 100 }
]

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

    addProduct(product, quantity = 1) {
        const productId = product.id

        if (this.validateProductId(productId)) {
            if (!this.products[productId]) {
                this.products[productId] = {
                    product, quantity
                };
                console.log(`${quantity} unit(s) of "${product.name} added to order"`);
            } else {
                this.products[productId].quantity += quantity;
                console.log(`${quantity} unit(s) of "${product.name} added to order"`);
            }

        } else {
            console.log("Id not found")
        }
    }

    removeProductById(productId,quantity=1) {
        const id = productId;
        if (this.validateProductId(id)) {
            const productEntry = this.products[id];
            if (productEntry) {
                if (productEntry.quantity > quantity) {
                    productEntry.quantity -= quantity;
                    console.log(`${quantity} unidad(es) de "${productEntry.product.name}" eliminada(s) de la orden.`);
                } else {
                    delete this.products[id];
                }
            } else {
                console.log('Product not found in the order');
            }
        } else {
            console.log("Id not found")
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

}

function menuProductos() {
    let salir = false;

    while (!salir) {
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}: ${product.price}$`);
        });
        let opcion = prompt("Elija un producto (o escriba 'salir' para salir, 'resumen' para ver el resumen)");

        switch (opcion.toLowerCase()) {
            case 'salir':
                salir = true;
                order.printProducts();
                order.calculateTotal();
                break;
            case 'resumen':
                order.printProducts();
                order.calculateTotal();
                break;
            default:
                let index = parseInt(opcion) - 1;
                if (!isNaN(index) && index >= 0 && index < products.length) {
                    order.addProduct(products[index], 1);
                    console.log(`Producto seleccionado: ${products[index].name}`);
                } else {
                    console.log("Opción no válida. Vuelva a intentar.");
                }
                break;
        }
    }
}

// Uso de la clase Order
const order = new Order();

menuProductos();
