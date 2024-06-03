import {CustomHttp} from "../src/services/custom-http.js";
import config from "../config/config.js";
import {Auth} from "../src/services/auth.js";


(function () {

    // не открывать страницу регистрации, если пользователь залогинен (есть токен)
    const accessToken = localStorage.getItem(Auth.accessTokenKey);
    if (accessToken) {
        location.href = window.location.href.split('sign-up.html')[0] + '#/';
        return;
    }

    const CheckoutSignup = {
        formButton: null,
        fields: [
            {
                name: 'name',
                id: 'nameInput',
                element: null,
                regex: /^([А-Я][а-я]+\s*){2,3}$/,
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
                regex: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/,
                valid: false,
            },
            {
                name: 'repeatPassword',
                id: 'repeatPasswordInput',
                passwordId: 'passwordInput',
                element: null,
                regex: null,
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
            if (field.name !== 'repeatPassword') {
                if (!element.value.match(field.regex)) {
                    element.classList.add('border-danger');
                    element.nextElementSibling.setAttribute('style', 'display:block');
                    field.valid = false;
                } else {
                    element.classList.remove('border-danger');
                    element.nextElementSibling.removeAttribute('style');
                    field.valid = true;
                }
            } else {
                if (element.value !== document.getElementById(field.passwordId).value) {
                    element.classList.add('border-danger');
                    element.nextElementSibling.setAttribute('style', 'display:block');
                    field.valid = false;
                } else {
                    element.classList.remove('border-danger');
                    element.nextElementSibling.removeAttribute('style');
                    field.valid = true;
                }
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

        async processForm() {
            if (this.validateForm()) {
                try {
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'name').element.value.split(' ')[0],
                        lastName: this.fields.find(item => item.name === 'name').element.value.split(' ')[1],
                        email: this.fields.find(item => item.name === 'email').element.value,
                        password: this.fields.find(item => item.name === 'password').element.value,
                        passwordRepeat: this.fields.find(item => item.name === 'repeatPassword').element.value,
                    });

                    if (result) {
                        if (result.error || !result.user.id || !result.user.email || !result.user.name || !result.user.lastName) {
                            throw new Error(result.message);
                        }


                        // перевод на другую страницу
                        location.href = 'login.html';
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
            }
        }
    };

    CheckoutSignup.init();
})();




