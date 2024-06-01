import {CreateCategory} from "./components/create-category.js";
import {EditCategory} from "./components/edit-category.js";
import {CreateIncomeAndExpenses} from "./components/create-income-and-expenses.js";
import {EditIncomeAndExpenses} from "./components/edit-income-and-expenses.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () => {
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'templates/expenses.html',
                styles: '',
                load: () => {
                    }
            },
            {
                route: '#/expenses-category-create',
                title: 'Создание категории расходов',
                template: 'templates/expenses-category-create.html',
                styles: '',
                load: () => {
                    new CreateCategory();
                    }
            },
            {
                route: '#/expenses-category-edit',
                title: 'Редактирование категории расходов',
                template: 'templates/expenses-category-edit.html',
                styles: '',
                load: () => {
                    new EditCategory();
                    }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                styles: '',
                load: () => {
                    }
            },
            {
                route: '#/income-and-expenses',
                title: 'Доходы и расходы',
                template: 'templates/income-and-expenses.html',
                styles: '',
                load: () => {
                    }
            },
            {
                route: '#/income-and-expenses-create',
                title: 'Создание дохода/расхода',
                template: 'templates/income-and-expenses-create.html',
                styles: '',
                load: () => {
                    new CreateIncomeAndExpenses();
                    }
            },
            {
                route: '#/income-and-expenses-edit',
                title: 'Редактирование дохода/расхода',
                template: 'templates/income-and-expenses-edit.html',
                styles: '',
                load: () => {
                    new EditIncomeAndExpenses();
                    }
            },
            {
                route: '#/income-category-create',
                title: 'Создание категории доходов',
                template: 'templates/income-category-create.html',
                styles: '',
                load: () => {
                    new CreateCategory();
                    }
            },
            {
                route: '#/income-category-edit',
                title: 'Создание категории доходов',
                template: 'templates/income-category-edit.html',
                styles: '',
                load: () => {
                    new EditCategory();
                    }
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());

        // нужно ли вообще? только у index собственный файл css, и там 2 свойства (перенести их в common?)
        document.getElementById('styles').setAttribute('href', newRoute.styles);

        document.getElementById('title').innerText = newRoute.title;

        newRoute.load();

    }

}