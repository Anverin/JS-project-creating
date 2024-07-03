import {LoginBase} from "../base/login-base.js";
import {FormValidator} from "../services/form-validator.js";

export class Login extends LoginBase {

    constructor() {
        super();
        this.rememberMeElement = null;
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
                regex: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/,
                valid: false,
            },
        ];

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            }
        });

        this.rememberMeElement = document.getElementById('remember-me-checkbox');

        this.formButton = document.getElementById('form-button');
        if (this.formButton) {
            this.formButton.onclick = function () {
                that.processForm();
            }
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
        FormValidator.validateForm(this.fields, this.formButton);
    }

    async processForm() {
        if (FormValidator.validateForm(this.fields, this.formButton)) {
            try {
                await this.login();

            } catch (error) {
                console.log(error);
            }
        }
    }

}