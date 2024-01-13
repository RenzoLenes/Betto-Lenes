let productos = [
    { nombre: "Polo Oversize", precio: 35 },
    { nombre: "Jogger Cargo", precio: 50 },
    { nombre: "Lentes Astetik", precio: 65 },
    { nombre: "Polera Oversize", precio: 100 },
    { nombre: "Polo Boxy Fit", precio: 30 }
];

let tasasDeCambio = {
    "ARS": 0.012,
    "BOB": 0.15,
    "BRL": 0.19,
    "CLP": 0.0014,
    "COP": 0.00028,
    "CRC": 0.0016,
    "DOP": 0.018,
    "GTQ": 0.13,
    "HNL": 0.042,
    "MXN": 0.050,
    "NIO": 0.029,
    "PAB": 1,
    "PYG": 0.00014,
    "PEN": 0.24,
    "USD": 1,
    "UYU": 0.022,
    "VES": 0.000024
};

let impuestosPorPais = {
    "Argentina": 0.21,
    "Bolivia": 0.13,
    "Brasil": 0.18,
    "Chile": 0.19,
    "Colombia": 0.19,
    "Costa Rica": 0.13,
    "Ecuador": 0.12,
    "El Salvador": 0.15,
    "Guatemala": 0.12,
    "Honduras": 0.15,
    "Mexico": 0.16,
    "Nicaragua": 0.15,
    "Panama": 0.07,
    "Paraguay": 0.10,
    "Peru": 0.18,
    "Republica Dominicana": 0.18,
    "Uruguay": 0.22,
    "Venezuela": 0.16,
    "Estados Unidos": 0.26
};

let monedasPorPais = {
    "Argentina": "ARS",
    "Bolivia": "BOB",
    "Brasil": "BRL",
    "Chile": "CLP",
    "Colombia": "COP",
    "Costa Rica": "CRC",
    "Ecuador": "USD",
    "El Salvador": "USD",
    "Guatemala": "GTQ",
    "Honduras": "HNL",
    "Mexico": "MXN",
    "Nicaragua": "NIO",
    "Panama": "PAB",
    "Paraguay": "PYG",
    "Peru": "PEN",
    "Republica Dominicana": "DOP",
    "Uruguay": "UYU",
    "Venezuela": "VES",
    "Estados Unidos": "USD"
};

let productosSeleccionados = [];

function menuProductos(moneda, tasaCambio) {
    let salir = false;

    while (!salir) {
        console.log(`Lista de productos en ${moneda}:`);
        productos.forEach((producto, index) => {
            let precioEnMoneda = producto.precio / tasaCambio;
            console.log(`${index + 1}. ${producto.nombre}: ${precioEnMoneda.toFixed(2)} ${moneda}`);
        });

        let opcion = prompt("Elija un producto (o escriba 'salir' para salir, 'resumen' para ver el resumen)");

        switch (opcion.toLowerCase()) {
            case 'salir':
                salir = true;
                break;
            case 'resumen':
                mostrarResumenCompra(moneda, tasaCambio);
                break;
            default:
                let indiceProducto = parseInt(opcion) - 1;
                if (!isNaN(indiceProducto) && indiceProducto >= 0 && indiceProducto < productos.length) {
                    productosSeleccionados.push(productos[indiceProducto]);
                    console.log(`Producto seleccionado: ${productos[indiceProducto].nombre}`);
                } else {
                    console.log("Opción no válida. Vuelva a intentar.");
                }
                break;
        }
    }
    mostrarResumenCompra(moneda, tasaCambio);
}
function mostrarResumenCompra(moneda, tasaCambio) {
    console.log("\nResumen de la compra:");

    let totalCompraSinImpuesto = 0;
    let totalImpuestos = 0;
    let totalCompraConImpuesto = 0;

    productosSeleccionados.forEach(producto => {
        let tax = impuestosPorPais[pais]
        let precioConvertido = producto.precio / tasaCambio
        let precioSinImpuesto = precioConvertido / (1 + tax);
        let impuesto = precioSinImpuesto * tax
        let precioFinal = precioConvertido;

        totalCompraSinImpuesto += precioSinImpuesto;
        totalImpuestos += impuesto;
        totalCompraConImpuesto += precioFinal;

        console.log(`${producto.nombre}: Precio Sin Impuesto ${precioSinImpuesto.toFixed(2)} ${moneda} - Impuesto ${impuesto.toFixed(2)} ${moneda} - Precio final ${precioFinal.toFixed(2)} ${moneda}`);
    });

    console.log("\nDetalle de la compra:");
    console.log(`Total sin impuestos: $${totalCompraSinImpuesto.toFixed(2)} ${moneda}`);
    console.log(`Total de impuestos: $${totalImpuestos.toFixed(2)} ${moneda}`);
    console.log(`Total con impuestos: $${totalCompraConImpuesto.toFixed(2)} ${moneda}`);
}

let pais = prompt("Ingrese su País").trim();

if (impuestosPorPais.hasOwnProperty(pais)) {
    let moneda = monedasPorPais[pais];
    let impuestoPorcentaje = impuestosPorPais[pais];
    let tasaCambio = tasasDeCambio[moneda] || 1;

    console.log(`Impuestos aplicados en ${pais}: ${impuestoPorcentaje * 100}%`);
    console.log(`Mostrando precios en ${moneda}\n`);

    menuProductos(moneda, tasaCambio);
} else {
    console.log("El país no existe en la lista. Configurando la moneda en USD (Dólares)\n");

    pais = "Estados Unidos"
    let moneda = monedasPorPais[pais]
    let tasaCambio = tasasDeCambio[moneda];

    menuProductos(moneda, tasaCambio);
}
