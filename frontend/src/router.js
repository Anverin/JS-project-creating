import {CreateCategory} from "./components/create-category.js";
import {EditCategory} from "./components/edit-category.js";
import {CreateIncomeAndExpenses} from "./components/create-income-and-expenses.js";
import {EditIncomeAndExpenses} from "./components/edit-income-and-expenses.js";
import {Auth} from "./services/auth.js";
import {CustomHttp} from "./services/custom-http.js";
import config from "../config/config.js";
import {SidebarMenuSections} from "./services/sidebar-menu-sections.js";
import {Login} from "./components/login.js";
import {Signup} from "./components/signup.js";
import {AdaptiveSidebarMove} from "./services/adaptive-sidebar-move.js";
import {ChangeBalance} from "./services/change-balance.js";
import {Income} from "./components/income.js";

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
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'templates/expenses.html',
                load: () => {
                }
            },
            {
                route: '#/expenses-category-create',
                title: 'Создание категории расходов',
                template: 'templates/expenses-category-create.html',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '#/expenses-category-edit',
                title: 'Редактирование категории расходов',
                template: 'templates/expenses-category-edit.html',
                load: () => {
                    new EditCategory();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/income-and-expenses',
                title: 'Доходы и расходы',
                template: 'templates/income-and-expenses.html',
                load: () => {
                }
            },
            {
                route: '#/income-and-expenses-create',
                title: 'Создание дохода/расхода',
                template: 'templates/income-and-expenses-create.html',
                load: () => {
                    new CreateIncomeAndExpenses();
                }
            },
            {
                route: '#/income-and-expenses-edit',
                title: 'Редактирование дохода/расхода',
                template: 'templates/income-and-expenses-edit.html',
                load: () => {
                    new EditIncomeAndExpenses();
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

        // подставление содержимого нужного темплейта
        switch (urlRoute) {
            case '#/signup' :
                // по умолчанию очистить страницу
                pageContent.innerHTML = '';
                // найти auth-template (без сайдбара)
                const sign = document.getElementById('auth-template');
                // отобразить его содержимое в pageContent (будет пусто)
                pageContent.append(sign.content.cloneNode(true));
                // найти див внутри auth-template
                const signContent = document.getElementById('auth-content');
                // вставить в него ответ на запрошенный роут
                signContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
                break;
            case '#/login' :
                pageContent.innerHTML = '';
                const auth = document.getElementById('auth-template');
                pageContent.append(auth.content.cloneNode(true));
                const authContent = document.getElementById('auth-content');
                authContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
                break;
            default :
                console.log(urlRoute);
                // очищать страницу полностью, только если на ней нет сайдбара (это страница регистрации/логина)
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
                    const balance = await CustomHttp.request(config.host + '/balance', "GET");
                    balanceValue.innerText = JSON.stringify(balance.balance);
                    adaptiveBalanceValue.innerText = JSON.stringify(balance.balance);
                } else {
                    userName.classList.add('d-none');
                    userNameAdaptive.classList.add('d-none');
                    balanceValue.innerText = '0';
                    adaptiveBalanceValue.innerText = '0';
                }

                new SidebarMenuSections().changeSections();
                new AdaptiveSidebarMove();
                new ChangeBalance();
                break;
        }

        this.titleElement.innerText = newRoute.title;

        newRoute.load();

    }

}


// if (!userInfo && !accessToken) {
//     userName.classList.add('d-none');
//     userNameAdaptive.classList.add('d-none');
//     balanceValue.innerText = '0';
//     adaptiveBalanceValue.innerText = '0';
// } else {
//     // отображение имени пользователя
//     userName.innerText = userInfo.userName;
//     userNameAdaptive.innerText = userInfo.userName;
//     // отображение баланса
//     const balance = await CustomHttp.request(config.host + '/balance', "GET");
//     balanceValue.innerText = JSON.stringify(balance.balance);
//     adaptiveBalanceValue.innerText = JSON.stringify(balance.balance);
// }


// const accessToken = localStorage.getItem(Auth.accessTokenKey);
// if (!accessToken) {
//     switch (urlRoute) {
//         case '#/signup' :
//             break;
//         case '#/login' :
//             break;
//         default :
//             location.hash = '#/login';
//     }
// }