(function () {
    const CheckoutLogin = {
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
                regex: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
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
                location.href = 'index.html'
            }
        }

    };

CheckoutLogin.init();
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


