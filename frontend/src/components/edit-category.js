export class EditCategory {
    constructor() {
        this.formButton = null;
        this.fields = [
            {
                name: 'category',
                id: 'new-category-name',
                element: null,
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

        this.formButton = document.getElementById('edit-category-button');
        this.formButton.onclick = function () {
            that.processForm();
        }
    }
    validateField(field, element) {
        if (!element.value) {

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
            location.href = '#/income-and-expenses'
        }
    }

    }
















