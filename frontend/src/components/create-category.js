import {Income} from "./income";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

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
        this.validateForm();
    }

    validateForm() {
        const isValid = this.fields.every(item => item.valid);
        if (isValid) {
            this.createCategoryBtn.removeAttribute('disabled');
        } else {
            this.createCategoryBtn.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }


    // async createNewCategory() {
    //     if (this.validateForm()) {
    //         let result = await CustomHttp.request(config.host + '/categories/income', "POST", {"title": this.newCategoryInput.value});
    //         console.log(result);
    //         location.href = '#/income-and-expenses'
    //     }
    // }

    async createNewCategory() {
        if (this.validateForm()) {
            const urlRoute = location.hash;

            switch (urlRoute) {
                case '#/income-category-create' :
                    let result = await CustomHttp.request(config.host + '/categories/income', "POST", {"title": this.newCategoryInput.value});
                    console.log(result);
                    location.href = '#/income-and-expenses';
                    break;
                case '#/expenses-category-create' :
                    let result1 = await CustomHttp.request(config.host + '/categories/expense', "POST", {"title": this.newCategoryInput.value});
                    console.log(result1);
                    location.href = '#/income-and-expenses';
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
//             location.href = '#/income-and-expenses'
//         }
//     }
// }


























