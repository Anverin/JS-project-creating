// import config from "../config/config.js";

import {CustomHttp} from "../src/services/custom-http.js";

(function () {
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
            // if (this.validateForm()) {
            //     try {
            //         const result = await CustomHttp.request('http://localhost:3000/api/signup', 'POST', {
            //             name: this.fields.find(item => item.name === 'name').element.value.split(' ')[0],
            //             lastName: this.fields.find(item => item.name === 'name').element.value.split(' ')[1],
            //             email: this.fields.find(item => item.name === 'email').element.value,
            //             password: this.fields.find(item => item.name === 'password').element.value,
            //             passwordRepeat: this.fields.find(item => item.name === 'repeatPassword').element.value,
            //         })
            //
            //         if (result) {
            //             if (result.error || !result.user) {
            //                 throw new Error(result.message);
            //             }
            //         }
            //
            //         // перевод на другую страницу
            //         location.href = '/';
            //
            //     } catch (error) {
            //         console.log(error);
            //     }
            //     } else {
            // }
        }
    };

    CheckoutSignup.init();
})();




// async processForm() {
//     if (this.validateForm()) {
//
//
//         try {
//             const response = await fetch('http://localhost:3000/api/signup',{
//                 method: "POST",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: this.fields.find(item => item.name === 'name').element.value.split(' ')[0],
//                     lastName: this.fields.find(item => item.name === 'name').element.value.split(' ')[1],
//                     email: this.fields.find(item => item.name === 'email').element.value,
//                     password: this.fields.find(item => item.name === 'password').element.value,
//                     passwordRepeat: this.fields.find(item => item.name === 'repeatPassword').element.value,
//                 })
//             });
//
//             if (response.status < 200 && response.status >= 300) {
//                 throw new Error(response.message);
//             }
//             // в ответе в постмане нет message, нужна ли эта проверка?
//
//             const result = await response.json();
//             if (result) {
//                 if (result.error || !result.user) {
//                     throw new Error(result.message);
//                 }
//             }
//
//             // перевод на другую страницу
//             location.href = '/';
//
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//
//     }
// }
