import {FormValidator} from "../services/form-validator.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class CreateIncomeAndExpense {
    constructor() {
        this.formButton = null;

        this.fields = [
            {
                name: 'type',
                id: 'budget-type',
                element: null,
                valid: true,
            },
            {
                name: 'category_id',
                id: 'budget-category',
                element: null,
                valid: false,
            },
            {
                name: 'amount',
                id: 'budget-sum',
                element: null,
                regex: /^[1-9][0-9]*\$?$/,
                valid: false,
            },
            {
                name: 'date',
                id: 'budget-date',
                element: null,
                valid: false,
            },
            {
                name: 'comment',
                id: 'budget-comment',
                element: null,
                valid: false,
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

        this.formButton = document.getElementById('create-budget-button');
        this.formButton.onclick = function () {
            that.processForm();
        }

        this.selectInitialType();
    }

    selectInitialType() {
        const budgetType = location.href.split('?')[1];
        document.getElementById('budget-type').childNodes.forEach(item => {
            if (item.value === budgetType) {
                item.setAttribute('selected', 'true')
            }
        });

        this.selectCategory().then();
    }

    async selectCategory() {  // должна подтягивать базу и отрисовывать опции в цикле
        const budgetCategory = document.getElementById('budget-category');

        const budgetType = document.getElementById('budget-type');        // может быть income/expense

        const budgetCategories = await CustomHttp.request(config.host + '/categories/' + budgetType.value, "GET");

        budgetCategory.innerHTML = '';

        const categoryPlaceholder = document.createElement('option');
        categoryPlaceholder.innerText = 'Категория...';
        budgetCategory.appendChild(categoryPlaceholder);

        budgetCategories.forEach(category => {
            const categorySelect = document.createElement('option');
            categorySelect.innerText = category.title;
            categorySelect.setAttribute('value', category.id);
            budgetCategory.appendChild(categorySelect);
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
            field.valid = true;
        }

        FormValidator.validateForm(this.fields, this.formButton);
    }

    async processForm() {
        if (FormValidator.validateForm(this.fields, this.formButton)) {

            const createCategoryData = this.fields.reduce(function (result, field) {
                return {
                    ...result,
                    [field.name]: field.element.value,
                }
            }, {})

            createCategoryData.category_id = parseInt(createCategoryData.category_id);

            let result = await CustomHttp.request(config.host + '/operations', "POST", createCategoryData);
            console.log(result);
            location.href = '#/income-and-expense';
        }
    }
}




