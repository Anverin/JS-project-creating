import {CustomHttp} from "../services/custom-http";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Categories {
    constructor() {
        // переменная для массива категорий
        this.categories = null;
        // переменная для хранения родительского дива с категориями
        this.cardsElement = null;

        // кнопка подтверждения удаления в поп-апе
        this.confirmDeleteCategoryBtnElement = null;


        // для универсальности кода для доходов и расходов
        this.typeCategories = null;
        this.page = null;
        if (location.hash === '#/income') {
            this.typeCategories = 'income';
        } else if (location.hash === '#/expense') {
            this.typeCategories = 'expense';
        }
        this.page = '/categories/' + this.typeCategories + '/';


        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const that = this;

        this.init().then();




        // this.confirmDeleteCategoryBtnElement = document.getElementById('confirm-delete-category-btn');
        // this.confirmDeleteCategoryBtnElement.onclick = function () {
        //     that.deleteCategory(that.categoryId);
        // }

        // this.deleteCategory();
        // this.categoryDeleteBtnElement.onclick = function () {
        //     that.deleteCategory().then();
        // }
    }

    // async deleteCategory(id) {
    //       if (this.accessToken) {
    //         await CustomHttp.request(config.host + this.page + id, "DELETE");
    //         // location.reload();
    //     }
    // }


    // запрос имеющихся в базе категорий (функция записывает массив с ними в переменную в конструкторе)
    async init() {
        if (this.accessToken) {
            try {
                const result = await CustomHttp.request(config.host + this.page, "GET");
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.categories = result;

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
        // объявление всеобщего родителя
        this.cardsElement = document.getElementById('cards');

        this.showIncomeCategory();
    }

    // отображение одной категории
    showIncomeCategory() {
        const typeCategories = this.typeCategories;

        this.categories.forEach(category => {

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
            deleteBtnElement.setAttribute('data-category-id', categoryId);
            deleteBtnElement.innerText = 'Удалить';

            // созданные элементы добавить в родителей по порядку, а потом все эти в общего родителя
            cardBodyElement.appendChild(cardTitleElement);
            cardBodyElement.appendChild(editBtnElement);
            cardBodyElement.appendChild(deleteBtnElement);
            cardElement.appendChild(cardBodyElement);
            cardItemElement.appendChild(cardElement);

            this.cardsElement.appendChild(cardItemElement);

            editBtnElement.onclick = function () {
                // переход на страницу редактирования с сохранением id в href для переноса (в функции openRoute от href отсекается все лишнее, это не повлияет на загрузку нужной страницы)
                location.href = '#/' + typeCategories + '-category-edit?id=' + categoryId;
            }


            const that = this;

            console.log(categoryId);

            const confirmDeleteCategoryBtnElement = document.getElementById('confirm-delete-category-btn');

            deleteBtnElement.onclick = function () {
                // переназначить обработчик для кнопки в поп-апе
                confirmDeleteCategoryBtnElement.onclick = function () {
                    console.log(categoryId);
                    that.deleteCategory(categoryId);
                }
            }
            //
            // confirmDeleteCategoryBtnElement.onclick = function () {
            //     console.log(categoryId);
            //     // здесь должна вызываться удаляющая фукнция, принимающая id категории
            //     that.deleteCategory();
            //     // that.deleteCategory(categoryId);
            // }


            // this.deleteCategory();
            // this.categoryDeleteBtnElement.onclick = function () {
            //     await that.deleteCategory().then();
            // }
            //



        });


        // добавить поле добавления категории в конец их списка
        this.newCategoryCreateField = document.getElementById('new-category-create-field');
        this.cardsElement.appendChild(this.newCategoryCreateField);
        // }

    }

    async deleteCategory(id) {
        if (this.accessToken) {
            await CustomHttp.request(config.host + this.page + id, "DELETE");
            console.log(config.host + this.page + id);
            location.reload();
        }
    }

}













// const confirmDeleteBtnElement = document.createElement('button');
// confirmDeleteBtnElement.classList.add('btn', 'btn-success', 'me-2');
// confirmDeleteBtnElement.setAttribute('data-bs-dismiss', 'modal');
// confirmDeleteBtnElement.innerText = 'Да, удалить';
// confirmDeleteBtnElement.id = '1';
//
// const doNotDeleteBtnElement = document.createElement('button');
// doNotDeleteBtnElement.classList.add('btn', 'btn-danger');
// doNotDeleteBtnElement.setAttribute('data-bs-dismiss', 'modal');
// doNotDeleteBtnElement.innerText = 'Не удалять';
//
// const modalButtonsElement = document.createElement('div');
// modalButtonsElement.classList.add('modal-buttons', 'mb-3');
// modalButtonsElement.appendChild(confirmDeleteBtnElement);
// modalButtonsElement.appendChild(doNotDeleteBtnElement);
//
// const modalBodyElement = document.createElement('div');
// modalBodyElement.classList.add('modal-body', 'mb-2');
// modalBodyElement.innerText = 'Вы действительно хотите удалить категорию?';
//
// const modalContentElement = document.createElement('div');
// modalContentElement.classList.add('modal-content', 'py-3', 'fw-bold');
// modalContentElement.appendChild(modalBodyElement);
// modalContentElement.appendChild(modalButtonsElement);
//
// const modalDialogElement = document.createElement('div');
// modalDialogElement.classList.add('modal-dialog', 'modal-dialog-centered', 'text-center');
// modalDialogElement.appendChild(modalContentElement);
//
// const deletePopUpElement = document.getElementById('delete-category');
// deletePopUpElement.appendChild(modalDialogElement);