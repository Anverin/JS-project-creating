// import {CustomHttp} from "../services/custom-http.js";
// import {Auth} from "../services/auth.js";
// import config from "../../config/config.js";
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







// const result = await CustomHttp.request(config.host + '/login', 'POST', {
//     email: this.fields.find(item => item.name === 'email').element.value,
//     password: this.fields.find(item => item.name === 'password').element.value,
//     rememberMe: this.rememberMeElement.checked,
// });
//
// if (result) {
//     if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
//         throw new Error(result.message);
//     }
//
//     Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
//
//     Auth.setUserInfo({
//         userName: result.user.name + ' ' + result.user.lastName,
//         userId: result.userId,
//     })
//
//     // перевод на другую страницу
//     location.href = '/';
// }