import {CreateCategory} from "./components/create-category.js";
import {EditCategory} from "./components/edit-category.js";
import {CreateIncomeAndExpenses} from "./components/create-income-and-expenses.js";
import {EditIncomeAndExpenses} from "./components/edit-income-and-expenses.js";
import {Auth} from "./services/auth.js";
import {CustomHttp} from "./services/custom-http.js";
import config from "../config/config.js";

export class Router {
    constructor() {

        // если пользователь не авторизован - перебрасывать на регистрацию
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (!accessToken) {
            location.href = 'sign-up.html';
            return;
        }

        this.contentElement = document.getElementById('content');
        // нужно ли вообще? только у index собственный файл css, и там 2 свойства (перенести их в common?)
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('title');

        this.userName = document.getElementById('user-name');
        this.userNameAdaptive = document.getElementById('user-info-name');

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
        const urlRoute = window.location.hash;

        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = 'login.html';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

       this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());

       this.stylesElement.setAttribute('href', newRoute.styles);

       this.titleElement.innerText = newRoute.title;



        // отображение имени пользователя
        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            this.userName.innerText = userInfo.userName;
            this.userNameAdaptive.innerText = userInfo.userName;
        } else {
            this.userName.classList.add('d-none');
            this.userNameAdaptive.classList.add('d-none');
        }

        // отображение баланса
        const balance = await CustomHttp.request(config.host + '/balance', "GET");
        document.getElementById('balance').innerText = JSON.stringify(balance.balance);
        document.getElementById('balance-adaptive').innerText = JSON.stringify(balance.balance);

        newRoute.load();

    }

}