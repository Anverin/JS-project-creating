import {CreateCategory} from "./components/create-category.js";
import {EditCategory} from "./components/edit-category.js";
import {CreateIncomeAndExpenses} from "./components/create-income-and-expenses.js";
import {EditIncomeAndExpenses} from "./components/edit-income-and-expenses.js";
import {Auth} from "./services/auth.js";
import {CustomHttp} from "./services/custom-http.js";
import config from "../config/config.js";
import {SidebarMenuSections} from "../scripts/sidebar-menu-sections.js";
import {CheckoutLogin} from "../scripts/checkout-login.js";
import {CheckoutSignup} from "../scripts/checkout-signup.js";

export class Router {
    constructor() {
        //
        // // если пользователь не авторизован - перебрасывать на регистрацию
        // const accessToken = localStorage.getItem(Auth.accessTokenKey);
        // if (!accessToken) {
        //     location.href = 'signup.html';
        //     return;
        // }

        this.mainContentElement = document.getElementById('main-content');
        this.authContentElement = document.getElementById('auth-content');
        this.titleElement = document.getElementById('title');
        this.userName = document.getElementById('user-name');
        this.userNameAdaptive = document.getElementById('user-info-name');

        this.routes = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: '',
                load: () => {
                    new CheckoutSignup();
                }
            },
            {
                route: '#/login',
                title: 'Авторизация',
                template: 'templates/login.html',
                styles: '',
                load: () => {
                    new CheckoutLogin();
                }
            },
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
        const body = document.querySelector('body');
        const test = document.getElementById('test');

        const urlRoute = window.location.hash;

        // при разлогинивании перебрасывать на логин
        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.hash = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }


        switch (urlRoute) {
            case '#/signup' :
                test.innerHTML = '';
                const sign = document.getElementById('auth-template');
                test.append(sign.content.cloneNode(true));
                const signContent = document.getElementById('auth-content');
                signContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
                break;
            case '#/login' :
                test.innerHTML = '';
                const auth = document.getElementById('auth-template');
                test.append(auth.content.cloneNode(true));
                const authContent = document.getElementById('auth-content');
                authContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
                break;
            default :
                if (!document.getElementById('normal-sidebar')) {
                    test.innerHTML = '';
                    const main = document.getElementById('main-template');
                    test.append(main.content.cloneNode(true));
                }
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = await fetch(newRoute.template).then(response => response.text());
                new SidebarMenuSections().changeSections();
                break;
        }

        // if (urlRoute !== '#/login') {
        //     // const main = document.getElementById('main-template');
        //     // test.append(main.content.cloneNode(true));
        //     // const content = document.getElementById('main-content');
        //     // content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        //     // при смене url - очистить body и заменить контент (вставить часть с сайдбаром)
        //     if (!document.getElementById('normal-sidebar')) {
        //         // alert('совпадает');
        //         // alert('нет');
        //         test.innerHTML = '';
        //         const main = document.getElementById('main-template');
        //         test.append(main.content.cloneNode(true));
        //         // const content = document.getElementById('main-content');
        //         // content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        //     }
        //     const content = document.getElementById('main-content');
        //     content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        //
        //     new SidebarMenuSections().changeSections();
        //
        //
        // } else {
        //     test.innerHTML = '';
        //     const auth = document.getElementById('auth-template');
        //     test.append(auth.content.cloneNode(true));
        //     const content = document.getElementById('auth-content');
        //     content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        // }

        // const body = document.querySelector('body');
        //     const auth = document.getElementById('auth-template');
        //     body.append(auth.content.cloneNode(true));
        //     const content = document.getElementById('auth-content');
        //     content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        //
        //     // if (location.href !== '#/login')
        //     {
        //             const main = document.getElementById('main-template');
        //             body.append(main.content.cloneNode(true));
        //             const content = document.getElementById('main-content');
        //             content.innerHTML = await fetch(newRoute.template).then(response => response.text());
        //     }


        // this.mainContentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.titleElement.innerText = newRoute.title;

        // if (location.hash === '#/login') {
        //      document.getElementById('normal-sidebar').classList.remove('d-md-flex');
        // }


        // отображение имени пользователя
        // const userInfo = Auth.getUserInfo();
        // const accessToken = localStorage.getItem(Auth.accessTokenKey);
        // if (userInfo && accessToken) {
        //     this.userName.innerText = userInfo.userName;
        //     this.userNameAdaptive.innerText = userInfo.userName;
        // } else {
        //     this.userName.classList.add('d-none');
        //     this.userNameAdaptive.classList.add('d-none');
        // }

        // отображение баланса
        // const balance = await CustomHttp.request(config.host + '/balance', "GET");
        // document.getElementById('balance').innerText = JSON.stringify(balance.balance);
        // document.getElementById('balance-adaptive').innerText = JSON.stringify(balance.balance);

        newRoute.load();

    }

}