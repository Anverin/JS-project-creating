export class EditIncomeAndExpenses {
    constructor() {
    this.formButton = null;
        this.fields = [
            {
                name: 'type',
                id: 'budget-type',
                element: null,
                value: null,
                valid: true,
            },
            {
                name: 'category',
                id: 'budget-category',
                element: null,
                value: null,
                valid: true,
            },
            {
                name: 'sum',
                id: 'budget-sum',
                element: null,
                regex:  /^[1-9][0-9]*\$?$/,
                value: null,
                valid: true,
            },
            {
                name: 'date',
                id: 'budget-date',
                element: null,
                value: null,
                valid: true,
            },
        ];

            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            });

            this.formButton = document.getElementById('edit-budget-button');
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
                field.value = element.value;
                field.valid = true;

                this.validateForm();
            }
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
                // перевод на другую страницу
                location.href = 'income-and-expenses.html'
            }
        }


}



