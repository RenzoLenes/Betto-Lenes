document.addEventListener('DOMContentLoaded', async function () {
     // Verifica si la moneda ya ha sido seleccionada
    const selectedCurrency = localStorage.getItem('selectedCurrency');

    if (!selectedCurrency) {
        // Si no se ha seleccionado, muestra SweetAlert para que el usuario elija
        const { value: selectedCurrency } = await Swal.fire({
            title: 'Select your currency',
            input: 'select',
            inputOptions: {
                'usd': 'United States Dollar (USD)',
                'eur': 'Euro (EUR)',
                'jpy': 'Japanese Yen (JPY)',
                'clp': 'Chilean Peso (CLP)',
                'ars': 'Argentine Peso (ARS)',
            },
            inputPlaceholder: 'Select a currency',
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You must select a currency';
                }

                localStorage.setItem('selectedCurrency', value);

                console.log('Selected currency:', value);
            }
        });
    }

});
