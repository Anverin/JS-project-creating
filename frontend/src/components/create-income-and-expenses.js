import {FormValidator} from "../services/form-validator.js";

export class CreateIncomeAndExpenses {
    constructor() {
            this.formButton = null;
            this.fields = [
                {
                    name: 'type',
                    id: 'budget-type',
                    element: null,
                    valid: false,
                },
                {
                    name: 'category',
                    id: 'budget-category',
                    element: null,
                    valid: false,
                },
                {
                    name: 'sum',
                    id: 'budget-sum',
                    element: null,
                    regex:  /^[1-9][0-9]*\$?$/,
                    // regex:  /^[1-9][0-9]*(?:\.[0-9]+)?\$?$/,    // с дробным числом
                    valid: false,
                },
                {
                    name: 'date',
                    id: 'budget-date',
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

                this.formButton = document.getElementById('create-budget-button');
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

                FormValidator.validateForm(this.fields, this.formButton);
            }

            processForm() {
                if (FormValidator.validateForm(this.fields, this.formButton)) {
                    // перевод на другую страницу
                    location.href = '#/income-and-expenses'
                }
            }
}




