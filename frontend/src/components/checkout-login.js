export class CheckoutLogin {
    constructor() {
        this.formButton = null;
        this.fields = [
            {
                name: 'email',
                id: 'emailInput',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'passwordInput',
                element: null,
                regex: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
                valid: false,
            },
        ];

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.formButton = document.getElementById('form-button');
        this.formButton.onclick = function () {
            that.processForm();
        }
    }

        validateField(field, element) {
              if (!element.value || !element.value.match(field.regex)) {
                element.classList.add('border-danger');
                element.nextElementSibling.setAttribute('style', 'display:block');
                field.valid = false;
            } else {
                element.classList.remove('border-danger');
                element.nextElementSibling.removeAttribute('style');
                  field.valid = true;
            }
              this.validateForm();
        }

        validateForm() {
            const isValid = this.fields.every(item => item.valid);
            if (isValid) {
                this.formButton.removeAttribute('disabled');
            } else {
                this.formButton.setAttribute('disabled', 'disabled');
            }
            return isValid;
        }


        processForm() {
            if (this.validateForm()) {
                location.href = 'index.html';

                // здесь как-то сохранить имя из url со страницы регистрации???
                // let paramString = '?' + this.fields[0].name + '=' + this.fields[0].element.value;
                // location.href = 'index.html' + paramString;
            }
        }
}