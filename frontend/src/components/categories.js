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
                    this.categories = result;
                    // console.log(result);

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
            editBtnElement.classList.add('btn', 'btn-primary', 'mb-2', 'me-2');
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

            // console.log(categoryId);

            const confirmDeleteCategoryBtn = document.getElementById('confirm-delete-category-btn');

            deleteBtnElement.onclick = function () {
                // переназначить обработчик для кнопки в поп-апе
                confirmDeleteCategoryBtn.onclick = function () {
                    console.log(categoryId);
                    that.deleteCategory(categoryId).then();
                }
            }
        });

        // добавить поле добавления категории в конец их списка
        this.newCategoryCreateField = document.getElementById('new-category-create-field');
        this.cardsElement.appendChild(this.newCategoryCreateField);
    }

    async deleteCategory(id) {
        if (this.accessToken) {
            await CustomHttp.request(config.host + this.page + id, "DELETE");
            console.log(config.host + this.page + id);
            location.reload();
        }
    }

}
