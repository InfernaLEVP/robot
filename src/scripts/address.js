export default function Address() {
    const addressButtons = document.querySelectorAll('.city__button');
    const cityInput = document.getElementById('m-city');
    const customSelect = document.querySelector('.select-hide');

    addressButtons.forEach(el => {
        el.addEventListener('click', (e) => {
            
            const city = e.target.dataset.city;
            console.warn(city);
            if(city){
                const divs = customSelect.querySelectorAll('div');

                divs.forEach(el => {
                    console.log(`${el.innerText} - ${city}`);
                    if(el.innerText === city){
                        el.click();
                    }
                });
                console.error(cityInput.value);
                // cityInput.value = city;
            }

        });
    });
}