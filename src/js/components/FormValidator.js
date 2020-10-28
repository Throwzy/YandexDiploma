export default class FormValidator {
    constructor(ValidationForm,spanElement) {
        this.ValidationForm = ValidationForm;
        this.spanElement = spanElement;
        this.setEventListeners = this.setEventListeners.bind(this);

    }
    checkInputValidity(inputElement, errorMessageElement){
        if (inputElement.value.length === 0) {
            errorMessageElement.textContent = 'Нужно ввести ключевое слово';
            console.log(inputElement.value.length);
            return this.setButtonStatus(false)
        }
        else {
            errorMessageElement.textContent = '';
            console.log('прошли валидацию');
            return this.setButtonStatus(true)
        }
    }
    setButtonStatus(valid) {
        const button = document.querySelector('.header__search-button')
        if (!valid) {
            button.setAttribute('disabled', true)
            return false
        }
        else if (valid) {
            button.removeAttribute('disabled', true)
            return true
        }
    }

    fetchInfo(link) {
        fetch(link).then(function(response) {
            console.log(response.json())
        })
    }

    setEventListeners() {
        const url = 'http://newsapi.org/v2/everything?' +
            'q=Apple&' +
            'from=2020-09-16&' +
            'sortBy=popularity&' +
            'apiKey=e532ea55bc1a4c099c61138e50d15465';
       const input = this.ValidationForm.querySelector('input');
       const button = this.ValidationForm.querySelector('button');
       this.ValidationForm.addEventListener('input', (event) => {
            this.setButtonStatus(this.checkInputValidity(input,this.spanElement))
       })
        // this.ValidationForm.addEventListener('submit', (event) => {
        //     event.preventDefault()
        //     if (this.setButtonStatus(this.checkInputValidity(input,this.spanElement))) {
        //         button.fetchInfo(url)
        //     }
        // })
}
}