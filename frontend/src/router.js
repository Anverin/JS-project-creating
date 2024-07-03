import {CreateCategory} from "./components/create-category.js";
import {EditCategory} from "./components/edit-category.js";
import {CreateIncomeAndExpense} from "./components/create-income-and-expense.js";
import {EditIncomeAndExpense} from "./components/edit-income-and-expense.js";
import {Auth} from "./services/auth.js";
import {Sidebar} from "./services/sidebar.js";
import {Login} from "./components/login.js";
import {Signup} from "./components/signup.js";
import {ChangeBalance} from "./services/change-balance.js";
import {Categories} from "./components/categories.js";
import {IncomeAndExpense} from "./components/income-and-expense.js";
import {Main} from "./components/main.js";

export class Router {
    constructor() {
        this.titleElement = document.getElementById('title');

        this.routes = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                load: () => {
                    new Signup();
                }
            },
            {
                route: '#/login',
                title: 'Авторизация',
                template: 'templates/login.html',
                load: () => {
                    new Login();
                }
            },
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                load: () => {
                    new Main();
                }
            },
            {
                route: '#/expense',
                title: 'Расходы',
                template: 'templates/expense.html',
                load: () => {
                    new Categories();
                }
            },
            {
                route: '#/expense-category-create',
                title: 'Создание категории расходов',
                template: 'templates/expense-category-create.html',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '#/expense-category-edit',
                title: 'Редактирование категории расходов',
                template: 'templates/expense-category-edit.html',
                load: () => {
                    new EditCategory();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                load: () => {
                    new Categories();
                }
            },
            {
                route: '#/income-and-expense',
                title: 'Доходы и расходы',
                template: 'templates/income-and-expense.html',
                load: () => {
                    new IncomeAndExpense();
                }
            },
            {
                route: '#/income-and-expense-create',
                title: 'Создание дохода/расхода',
                template: 'templates/income-and-expense-create.html',
                load: () => {
                    new CreateIncomeAndExpense();
                }
            },
            {
                route: '#/income-and-expense-edit',
                title: 'Редактирование дохода/расхода',
                template: 'templates/income-and-expense-edit.html',
                load: () => {
                    new EditIncomeAndExpense();
                }
            },
            {
                route: '#/income-category-create',
                title: 'Создание категории доходов',
                template: 'templates/income-category-create.html',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '#/income-category-edit',
                title: 'Редактирование категории доходов',
                template: 'templates/income-category-edit.html',
                load: () => {
                    new EditCategory();
                }
            },
        ]
    }

    async openRoute() {
        const pageContent = document.getElementById('page-content');

        const urlRoute = location.hash.split('?')[0];

        // при разлогинивании перебрасывать на логин
        if (urlRoute === '#/logout') {
            await Auth.logout();
            location.href = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            location.href = '#/';
            return;
        }

        // если пользователь не авторизован - перебрасывать на логин
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (!accessToken && urlRoute !== '#/signup' && urlRoute !== '#/login') {
            location.href = '#/login';
            return;
        }

        if (urlRoute !== '#/signup' && urlRoute !== '#/login') {
            if (!document.getElementById('normal-sidebar')) {
                pageContent.innerHTML = '';
                const main = document.getElementById('main-template');
                pageContent.append(main.content.cloneNode(true));
            }
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = await fetch(newRoute.template).then(response => response.text());

            const userInfo = Auth.getUserInfo();
            const accessToken = localStorage.getItem(Auth.accessTokenKey);
            const userName = document.getElementById('user-name');
            const userNameAdaptive = document.getElementById('user-info-name');
            const balanceValue = document.getElementById('balance');
            const adaptiveBalanceValue = document.getElementById('balance-adaptive');
            if (userInfo && accessToken) {
                // отображение имени пользователя
                userName.innerText = userInfo.userName;
                userNameAdaptive.innerText = userInfo.userName;
                // отображение баланса
                await new ChangeBalance().getBalance();
            } else {
                userName.classList.add('d-none');
                userNameAdaptive.classList.add('d-none');
                balanceValue.innerText = '0';
                adaptiveBalanceValue.innerText = '0';
            }
            new Sidebar().changeSections();
        } else {
            pageContent.innerHTML = '';
            const sign = document.getElementById('auth-template');
            pageContent.append(sign.content.cloneNode(true));
            const signContent = document.getElementById('auth-content');
            signContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
        }

        this.titleElement.innerText = newRoute.title;

        newRoute.load();
    }

}
