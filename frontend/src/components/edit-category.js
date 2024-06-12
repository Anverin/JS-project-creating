import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {FormValidator} from "../services/form-validator";

export class EditCategory {
    constructor() {
        this.formButton = null;
        this.newCategoryNameInput = null;

        this.categoryId = location.href.split('=')[1];



        // this.categoryTitle = null;

        this.page = null;
        this.splitHash = location.hash.split('?')[0];
        if ( this.splitHash === '#/income-category-edit') {
            this.page = '/categories/income/'
        } else if ( this.splitHash === '#/expenses-category-edit') {
            this.page = '/categories/expense/'
        }

        this.getCategoryTitle(this.categoryId).then();

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
            console.log(item.id, item);
            // if (item.element === null) {
            //    let a = 5;
            // }
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.formButton = document.getElementById('edit-category-button');
        this.formButton.onclick = function () {
            that.processForm(that.categoryId);
        }

        this.newCategoryNameInput = document.getElementById('new-category-name');
    }

    async getCategoryTitle(id) {
        const result = await CustomHttp.request(config.host + this.page + id, "GET");
        // this.categoryTitle = result.title;
        this.fields[0].element.value = result.title;
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

        FormValidator.validateForm(this.fields, this.formButton);
    }



  processForm(id) {
        if (FormValidator.validateForm(this.fields, this.formButton)) {

            this.editCategory(id).then();

            // await CustomHttp.request(config.host + '/categories/income/' + id, "PUT", {"title": this.newCategoryNameInput.value});

            location.href = '#/income-and-expenses'
        }
    }

        async editCategory(id) {
        await CustomHttp.request(config.host + this.page + id, "PUT", {"title": this.newCategoryNameInput.value});
    }

}
















