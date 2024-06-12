import {Auth} from "./auth.js";

export class SidebarMenuSections {
    constructor() {
        this.adaptiveHeaderBurger = document.getElementById('adaptive-header-burger');
        this.adaptiveSidebar = document.getElementById("adaptive-sidebar");
        this.adaptiveSidebarCross = document.getElementById('adaptive-sidebar-cross');

        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const that = this;

        if (this.accessToken) {
            this.adaptiveHeaderBurger.onclick = function () {
                that.openAdaptiveSidebar();
            }

            this.adaptiveSidebarCross.onclick = function () {
                that.closeAdaptiveSidebar();
            }
        }

        this.normalSidebarCategories = document.getElementById('normal-sidebar-categories');
        this.normalSidebarCategoriesSvgDark = document.getElementById('normal-sidebar-categories-svg-dark');
        this.normalSidebarIncome = document.getElementById('normal-sidebar-income');
        this.normalSidebarExpense = document.getElementById('normal-sidebar-expense');
        this.normalSidebarCategoriesCollapse = document.getElementById('normal-sidebar-categories-collapse');

        this.adaptiveSidebarCategories = document.getElementById('adaptive-sidebar-categories');
        this.adaptiveSidebarCategoriesSvgDark = document.getElementById('adaptive-sidebar-categories-svg-dark');
        this.adaptiveSidebarIncome = document.getElementById('adaptive-sidebar-income');
        this.adaptiveSidebarExpense = document.getElementById('adaptive-sidebar-expense');
        this.adaptiveSidebarCategoriesCollapse = document.getElementById('adaptive-sidebar-categories-collapse');

        this.links = Array.from(document.querySelectorAll('.nav-link'));
    }

    changeSections() {
        if (this.accessToken) {

        // перебрать все ссылки и удалить класс active
        this.links.forEach(link => link.classList.remove('active'));

        // найти ссылку, соответствующую текущей странице (вернется массив, т.к. этих ссылок будет две - в двух сайдбарах)
        const activeLink = this.links.filter(link => {
            const href = link.getAttribute('href');
            return href && href === window.location.hash;
        });

        // если находится - покрасить ее
        if (activeLink) {
            activeLink.forEach(item => {
                item.classList.add('active');
            });

        }

        if (window.location.hash === '#/income' || window.location.hash === '#/expense') {
            // придется оставить, т.к. у заголовка выпадающего списка нет своей страницы
            this.normalSidebarCategories.classList.add('active');
            // чтобы список категорий сворачивался при переходе на другую страницу
            this.normalSidebarCategoriesCollapse.classList.add('show');
            // поворот стрелочки в выпадающем списке
            this.normalSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
            this.normalSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpense.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.normalSidebarCategories.classList.remove('active');
            this.normalSidebarCategoriesCollapse.classList.remove('show');
            this.normalSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
            this.normalSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpense.classList.remove('border', 'border-top-0', 'border-primary');
        }


        // для адаптивного сайдбара
        if (window.location.hash === '#/income' || window.location.hash === '#/expense') {
            this.adaptiveSidebarCategories.classList.add('active');
            this.adaptiveSidebarCategoriesCollapse.classList.add('show');
            this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
            this.adaptiveSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpense.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.adaptiveSidebarCategories.classList.remove('active');
            this.adaptiveSidebarCategoriesCollapse.classList.remove('show');
            this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
            this.adaptiveSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpense.classList.remove('border', 'border-top-0', 'border-primary');
        }
}

}



    openAdaptiveSidebar() {
        this.adaptiveSidebar.style.width = "250px";
    }

    closeAdaptiveSidebar() {
        this.adaptiveSidebar.style.width = "0";
    }
}

