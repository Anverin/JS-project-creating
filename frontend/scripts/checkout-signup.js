(function () {
    const CheckoutSignup = {
        formButton: null,
        fields: [
            {
                name: 'name',
                id: 'nameInput',
                element: null,
                // regex: /^[А-Я][а-я]+\s*$/,        // на одно имя
                regex: /^([А-Я][а-я]+\s*){1,3}$/,        // на ФИО (три слова)
                valid: false,
            },
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
            {
                name: 'repeatPassword',
                id: 'repeatPasswordInput',
                element: null,
                regex: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
                valid: false,
            },
        ],

        init() {
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
        },

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
        },

        validateForm() {
            const isValid = this.fields.every(item => item.valid);
            if (isValid) {
                this.formButton.removeAttribute('disabled');
            } else {
                this.formButton.setAttribute('disabled', 'disabled');
            }
            return isValid;
        },

        processForm() {
            if (this.validateForm()) {
                // перевод на другую страницу (Quiz2 32:00)
                location.href = 'login.html'
            }
        }
    };

    CheckoutSignup.init();
})();


// document.getElementById('form-button').onclick = function () {
//     let email = document.getElementById('emailInput');
//     let password = document.getElementById('passwordInput');
//
//     if (!email.value) {
//         email.classList.add('border-danger');
//         email.nextElementSibling.setAttribute('style', 'display:block');
//     } else {
//         email.classList.remove('border-danger');
//         email.nextElementSibling.removeAttribute('style', 'display:block');
//     }
// }



// вставить повторение пароля в массив (выше, при загрузке страницы, его еще нет в массиве)
// for (let i = 0; i < this.validations.length; i++) {
//     if (this.validations[i].element === this.passwordRepeatElement) {
//         this.validations[i].options.compareTo = this.passwordElement.value;
//     }
// }


// if (element.name === 'repeatPassword' && element.value !== this.fields[2].value) {
//     element.classList.add('border-danger');
//     element.nextElementSibling.setAttribute('style', 'display:block');
//     field.valid = false;
//     console.log(111);

// }
// if (password.value !== repeatPassword.value) {
//     alert('Пароли не совпадают');
// }

// if (this.validations[i].element === this.passwordRepeatElement) {
//         this.validations[i].options.compareTo = this.passwordElement.value;
//     }