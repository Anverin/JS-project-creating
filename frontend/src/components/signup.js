import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";
import {LoginBase} from "../base/login-base.js";
import {FormValidator} from "../services/form-validator.js";


export class Signup extends LoginBase {
    constructor() {
        super();

        // не открывать страницу регистрации, если пользователь залогинен (есть токен)
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (accessToken) {
            location.href = window.location.href.split('signup')[0];
            return;
        }

        this.formButton = null;
        this.fields = [
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

            FormValidator.validateForm(this.fields, this.formButton);
        }

        async processForm() {
            if (FormValidator.validateForm(this.fields, this.formButton)) {
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

                        await this.login();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }