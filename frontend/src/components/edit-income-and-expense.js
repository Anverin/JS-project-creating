import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {FormValidator} from "../services/form-validator.js";

export class EditIncomeAndExpense {
    constructor() {
        this.formButton = null;

        this.categoryId = location.href.split('=')[1];

        this.getBudgetItem(this.categoryId).then();

        this.fields = [
            {
                name: 'type',
                id: 'budget-type',
                element: null,
                value: null,
                valid: true,
            },
            {
                name: 'category_id',
                id: 'budget-category',
                element: null,
                value: null,
                valid: true,
            },
            {
                name: 'amount',
                id: 'budget-sum',
                element: null,
                regex: /^[1-9][0-9]*\$?$/,
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
            {
                name: 'comment',
                id: 'budget-comment',
                element: null,
                valid: true,
            },
        ];

        const that = this;

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
                if (item.name === 'type') {
                    that.selectCategory().then();
                }
            }
        });

        this.formButton = document.getElementById('edit-budget-button');
        this.formButton.onclick = function () {
            that.processForm().then();
        }
    }

    // предварительное размещение данных об операции в поля формы
    async getBudgetItem(id) {
        const result = await CustomHttp.request(config.host + '/operations/' + id, "GET");

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
                if (item.name === 'type') {
                    item.element.value = result.type;
                }
                if (item.name === 'category_id') {
                    item.element.value = result.category;
                }
                if (item.name === 'amount') {
                    item.element.value = result.amount;
                }
                if (item.name === 'date') {
                    item.element.value = result.date;
                }
                if (item.name === 'comment') {
                    item.element.value = result.comment;
                }
        });

        this.selectCategory(result.category).then();
    }


    // подтягивание информации об операции, отрисовывание опций
    async selectCategory(categoryName) {
        const budgetType = document.getElementById('budget-type');        // может быть income/expense

        const budgetCategory = document.getElementById('budget-category');

        const budgetCategories = await CustomHttp.request(config.host + '/categories/' + budgetType.value, "GET");

        budgetCategory.innerHTML = '';

            // отрисовать варианты категорий в этом типе бюджета
        budgetCategories.forEach(category => {
            const categorySelect = document.createElement('option');
            categorySelect.innerText = category.title;
            categorySelect.setAttribute('value', category.id);
            budgetCategory.appendChild(categorySelect);

            if (category.title === categoryName) {
                categorySelect.setAttribute('selected', 'true');
            }
        });
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

            FormValidator.validateForm(this.fields, this.formButton);
        }
    }

    async processForm() {
        if (FormValidator.validateForm(this.fields, this.formButton)) {
            const newCategoryData = this.fields.reduce(function (result, field) {
                return {
                    ...result,
                    [field.name]: field.element.value,
                }
            }, {})

            newCategoryData.category_id = parseInt(newCategoryData.category_id);

            let result = await CustomHttp.request(config.host + '/operations/' + this.categoryId, "PUT", newCategoryData);
            console.log(result);
            location.href = '#/income-and-expense';
        }
    }
}



