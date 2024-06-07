import {CustomHttp} from "./custom-http.js";
import {Auth} from "./auth.js";
import config from "../../config/config.js";

export class CheckoutLogin {

    constructor() {
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
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.rememberMeElement = document.getElementById('remember-me-checkbox');

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

    async processForm() {
        if (this.validateForm()) {
            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: this.fields.find(item => item.name === 'email').element.value,
                    password: this.fields.find(item => item.name === 'password').element.value,
                    rememberMe: this.rememberMeElement.checked,
                });

                if (result) {
                    if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);

                    Auth.setUserInfo({
                        userName: result.user.name + ' ' + result.user.lastName,
                        userId: result.userId,
                    })

                    // перевод на другую страницу
                    location.href = '/';
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

}


// (function () {
//     const CheckoutLogin = {
//         rememberMeElement: null,
//         formButton: null,
//         fields: [
//             {
//                 name: 'email',
//                 id: 'emailInput',
//                 element: null,
//                 regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//                 valid: false,
//             },
//             {
//                 name: 'password',
//                 id: 'passwordInput',
//                 element: null,
//                 regex: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/,
//                 valid: false,
//             },
//         ],
//
//         init() {
//             const that = this;
//             this.fields.forEach(item => {
//                 item.element = document.getElementById(item.id);
//                 item.element.onchange = function () {
//                     that.validateField.call(that, item, this);
//                 }
//             });
//
//             this.rememberMeElement = document.getElementById('remember-me-checkbox');
//
//             this.formButton = document.getElementById('form-button');
//             this.formButton.onclick = function () {
//                 that.processForm();
//             }
//
//         },
//
//         validateField(field, element) {
//             if (!element.value || !element.value.match(field.regex)) {
//                 element.classList.add('border-danger');
//                 element.nextElementSibling.setAttribute('style', 'display:block');
//                 field.valid = false;
//             } else {
//                 element.classList.remove('border-danger');
//                 element.nextElementSibling.removeAttribute('style');
//                 field.valid = true;
//             }
//             this.validateForm();
//         },
//
//         validateForm() {
//             const isValid = this.fields.every(item => item.valid);
//             if (isValid) {
//                 this.formButton.removeAttribute('disabled');
//             } else {
//                 this.formButton.setAttribute('disabled', 'disabled');
//             }
//             return isValid;
//         },
//
//
//         async processForm() {
//             if (this.validateForm()) {
//                 try {
//                     const result = await CustomHttp.request(config.host + '/login', 'POST', {
//                         email: this.fields.find(item => item.name === 'email').element.value,
//                         password: this.fields.find(item => item.name === 'password').element.value,
//                         rememberMe: this.rememberMeElement.checked,
//                     });
//
//                     if (result) {
//                         if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
//                             throw new Error(result.message);
//                         }
//
//                         Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
//
//                         Auth.setUserInfo({
//                             userName: result.user.name + ' ' + result.user.lastName,
//                             userId: result.userId,
//                         })
//
//                         // перевод на другую страницу
//                         location.href = '/';
//                     }
//
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         }
//
//     };
//
//     CheckoutLogin.init();
// })();

