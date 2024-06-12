import {CustomHttp} from "../services/custom-http";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";
import {EditCategory} from "./edit-category.js";

export class Income {
    constructor() {

        // переменная для массива категорий
        this.incomeCategories = null;
        // переменная для хранения родительского дива с категориями
        this.cardsElement = null;

        // this.categoryDeleteBtnElement = null;


        this.typeCategories = null;
        this.page = null;
        if (location.hash === '#/income') {
            this.typeCategories = 'income';
        } else if (location.hash === '#/expenses') {
            this.typeCategories = 'expense';
        }
        this.page = '/categories/' + this.typeCategories + '/';



        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const that = this;

        this.init().then();

        // this.deleteCategory();
        // this.categoryDeleteBtnElement.onclick = function () {
        //     that.deleteCategory().then();
        // }
    }

    async deleteCategory(id) {
        if (this.accessToken) {
            await CustomHttp.request(config.host + this.page + id, "DELETE");
            location.reload();
        }
    }


    // запрос имеющихся в базе категорий (функция записывает массив с ними в переменную в конструкторе)
    async init() {
        if (this.accessToken) {
            try {
                const result = await CustomHttp.request(config.host + this.page, "GET");
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.incomeCategories = result;
                    console.log(result);
                    this.showIncomeCategories();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    // если все в порядке, показываются категории
    showIncomeCategories() {
        this.cardsElement = document.getElementById('cards');

        this.showIncomeCategory();
    }

    // отображение одной категории
    showIncomeCategory() {
        console.log(this.incomeCategories);

        const typeCategories = this.typeCategories;

        this.incomeCategories.forEach(category => {

            console.log(typeCategories);


           const categoryId = category.id;
           const categoryTitle = category.title;

            const cardItemElement = document.createElement('div');
            cardItemElement.className = 'card-item';
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            const cardBodyElement = document.createElement('div');
            cardBodyElement.className = 'card-body';

            const cardTitleElement = document.createElement('h4');
            cardTitleElement.className = 'card-title';
            cardTitleElement.classList.add('fw-bold');
            cardTitleElement.innerHTML = categoryTitle;

            const editBtnElement = document.createElement('a');
            // const editBtnElement = document.createElement('button');
            editBtnElement.classList.add('btn', 'btn-primary', 'mb-2', 'me-2');
            // editBtnElement.setAttribute('href', '#/income-category-edit');
            editBtnElement.innerText = 'Редактировать';

            const deleteBtnElement = document.createElement('button');
            deleteBtnElement.classList.add('btn', 'btn-danger', 'mb-2');
            deleteBtnElement.setAttribute('data-bs-toggle', 'modal');
            deleteBtnElement.setAttribute('data-bs-target', '#delete-category');
            deleteBtnElement.innerText = 'Удалить';

            // созданные элементы добавить в родителей по порядку, а потом все эти в общего родителя
            cardBodyElement.appendChild(cardTitleElement);
            cardBodyElement.appendChild(editBtnElement);
            cardBodyElement.appendChild(deleteBtnElement);
            cardElement.appendChild(cardBodyElement);
            cardItemElement.appendChild(cardElement);

            this.cardsElement.appendChild(cardItemElement);


            editBtnElement.onclick = function () {
                // new EditCategory();
                // EditCategory.editCategory(categoryId);
                location.href = '#/' + typeCategories + '-category-edit?id=' + categoryId;

                // new EditCategory().processForm(categoryId);



            }

            // const that = this;

            // deleteBtnElement.onclick = function () {
            // that.deleteCategory(categoryId);
            // }



        });

        // добавить поле добавления категории в конец их списка
        this.newCategoryCreateField = document.getElementById('new-category-create-field');
        // this.cardsElement.appendChild(this.newCategoryCreateField);
        // }

    }

}


// // Get a reference to the element in which we want to insert a new node
// var parentElement = document.getElementById('parentElement');
//
// // Get a reference to the first child
// var theFirstChild = parentElement.firstChild;
//
// // Create a new element
// var newElement = document.createElement("div");
//
// // Insert the new element before the first child
// parentElement.insertBefore(newElement, theFirstChild);