import {CustomHttp} from "../src/services/custom-http.js";

(function () {
    const CheckoutLogin = {
        // rememberMeElement: null,
        formButton: null,
        fields: [
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
        ],

      init () {
            const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        const rememberMeElement = document.getElementById('remember-me-checkbox');
        // rememberMeElement.onchange = function () { // будет влиять на время жизни токенов
        //    if (rememberMeElement.checked) {
        //        return true;
        //    } else {
        //        return false;
        //    }
        // }

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


        async processForm() {
            if (this.validateForm()) {
                try {
                        const result = await CustomHttp.request('http://localhost:3000/api/signup', 'POST', {
                            email: this.fields.find(item => item.name === 'email').element.value,
                            password: this.fields.find(item => item.name === 'password').element.value,
                            rememberMe: false,
                        })

                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }

                    // перевод на другую страницу
                    location.href = '/';

                } catch (error) {
                    console.log(error);
                }
            }

                // добавить выбранность запоминания для токенов??
        }

    };

CheckoutLogin.init();
})();



// async processForm() {
//     if (this.validateForm()) {
//         try {
//             const response = await fetch('http://localhost:3000/api/signup',{
//                 method: "POST",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: this.fields.find(item => item.name === 'email').element.value,
//                     password: this.fields.find(item => item.name === 'password').element.value,
//                     rememberMe: false,
//                 })
//             });
//
//             // перевод на другую страницу
//             location.href = '/';
//
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     // добавить выбранность запоминания для токенов??
// }