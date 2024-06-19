import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";
import {FormValidator} from "../services/form-validator.js";

export class CreateCategory {
    constructor() {
        this.accessToken = localStorage.getItem(Auth.accessTokenKey);
        this.newCategoryInput = document.getElementById('new-category-name');
        this.createCategoryBtn = document.getElementById('create-category-button');

        const that = this;

        this.fields = [
            {
                name: 'category',
                id: 'new-category-name',
                element: null,
                valid: false,
            },
        ];

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        })

        this.createCategoryBtn.onclick = function () {
            that.createNewCategory();
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
        FormValidator.validateForm(this.fields, this.createCategoryBtn);
    }

    // async createNewCategory() {
    //     if (this.validateForm()) {
    //         let result = await CustomHttp.request(config.host + '/categories/income', "POST", {"title": this.newCategoryInput.value});
    //         console.log(result);
    //         location.href = '#/income-and-expense'
    //     }
    // }

    async createNewCategory() {
        if (FormValidator.validateForm(this.fields, this.createCategoryBtn)) {
            const urlRoute = location.hash;

            switch (urlRoute) {
                case '#/income-category-create' :
                    let result = await CustomHttp.request(config.host + '/categories/income', "POST", {"title": this.newCategoryInput.value});
                    console.log(result);
                    location.href = '#/income-and-expense';
                    break;
                case '#/expense-category-create' :
                    let result1 = await CustomHttp.request(config.host + '/categories/expense', "POST", {"title": this.newCategoryInput.value});
                    console.log(result1);
                    location.href = '#/income-and-expense';
                    break;
                default :
                    break;
            }
        }

    }

}


//
// import {Income} from "./income";
// import {CustomHttp} from "../services/custom-http";
// import config from "../../config/config";
//
// export class CreateCategory {
//     constructor() {
//         this.formButton = null;
//         this.fields = [
//             {
//                 name: 'category',
//                 id: 'new-category-name',
//                 element: null,
//                 valid: false,
//             },
//         ];
//
//         const that = this;
//         this.fields.forEach(item => {
//             item.element = document.getElementById(item.id);
//             item.element.onchange = function () {
//                 that.validateField.call(that, item, this);
//             }
//         })
//
//         this.formButton = document.getElementById('create-category-button');
//         this.formButton.onclick = function () {
//             that.createNewCategory();
//         }
//     }
//
//     validateField(field, element) {
//         if (!element.value) {
//
//             element.classList.add('border-danger');
//             element.nextElementSibling.setAttribute('style', 'display:block');
//             field.valid = false;
//         } else {
//             element.classList.remove('border-danger');
//             element.nextElementSibling.removeAttribute('style');
//             field.valid = true;
//         }
//         this.validateForm();
//     }
//
//     validateForm() {
//         const isValid = this.fields.every(item => item.valid);
//         if (isValid) {
//             this.formButton.removeAttribute('disabled');
//         } else {
//             this.formButton.setAttribute('disabled', 'disabled');
//         }
//         return isValid;
//     }
//
//     async createNewCategory() {
//         if (this.validateForm()) {
//             await CustomHttp.request(config.host + '/categories/income', "POST", {"title": this.changBalanceInput.value});
//
//             location.href = '#/income-and-expense'
//         }
//     }
// }


























