export class SidebarMenuSections {
    constructor() {
        this.normalSidebarCategories = document.getElementById('normal-sidebar-categories');
        this.normalSidebarCategoriesSvgDark = document.getElementById('normal-sidebar-categories-svg-dark');
        this.normalSidebarIncome = document.getElementById('normal-sidebar-income');
        this.normalSidebarExpenses = document.getElementById('normal-sidebar-expenses');
        this.normalSidebarCategoriesCollapse = document.getElementById('normal-sidebar-categories-collapse');

        this.adaptiveSidebarCategories = document.getElementById('adaptive-sidebar-categories');
        this.adaptiveSidebarCategoriesSvgDark = document.getElementById('adaptive-sidebar-categories-svg-dark');
        this.adaptiveSidebarIncome = document.getElementById('adaptive-sidebar-income');
        this.adaptiveSidebarExpenses = document.getElementById('adaptive-sidebar-expenses');
        this.adaptiveSidebarCategoriesCollapse = document.getElementById('adaptive-sidebar-categories-collapse');

        this.links = Array.from(document.querySelectorAll('.nav-link'));
    }

    changeSections() {
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

        if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
            // придется оставить, т.к. у заголовка выпадающего списка нет своей страницы
            this.normalSidebarCategories.classList.add('active');
            // чтобы список категорий сворачивался при переходе на другую страницу
            this.normalSidebarCategoriesCollapse.classList.add('show');
            // поворот стрелочки в выпадающем списке
            this.normalSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
            this.normalSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.normalSidebarCategories.classList.remove('active');
            this.normalSidebarCategoriesCollapse.classList.remove('show');
            this.normalSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
            this.normalSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
        }


        // для адаптивного сайдбара
        if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
            this.adaptiveSidebarCategories.classList.add('active');
            this.adaptiveSidebarCategoriesCollapse.classList.add('show');
            this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
            this.adaptiveSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.adaptiveSidebarCategories.classList.remove('active');
            this.adaptiveSidebarCategoriesCollapse.classList.remove('show');
            this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
            this.adaptiveSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
        }
}

}













// changeSections() {
//     if (window.location.hash === '#/') {
//         this.normalSidebarMain.classList.add('active');
//     } else {
//         this.normalSidebarMain.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/income-and-expenses') {
//         this.normalSidebarIE.classList.add('active');
//     } else {
//         this.normalSidebarIE.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
//         this.normalSidebarCategories.classList.add('active');
//         this.normalSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
//         this.normalSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
//         this.normalSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
//     } else {
//         this.normalSidebarCategories.classList.remove('active');
//         this.normalSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
//         this.normalSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
//         this.normalSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
//     }
//
//     if (window.location.hash === '#/income') {
//         this.normalSidebarIncome.classList.add('active');
//     } else {
//         this.normalSidebarIncome.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/expenses') {
//         this.normalSidebarExpenses.classList.add('active');
//     } else {
//         this.normalSidebarExpenses.classList.remove('active');
//     }
//
//
//
//     // для адаптивного сайдбара
//     if (window.location.hash === '#/') {
//         this.adaptiveSidebarMain.classList.add('active');
//     } else {
//         this.adaptiveSidebarMain.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/income-and-expenses') {
//         this.adaptiveSidebarIE.classList.add('active');
//     } else {
//         this.adaptiveSidebarIE.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
//         this.adaptiveSidebarCategories.classList.add('active');
//         this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(90deg)";
//         this.adaptiveSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
//         this.adaptiveSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
//     } else {
//         this.adaptiveSidebarCategories.classList.remove('active');
//         this.adaptiveSidebarCategoriesSvgDark.style.transform = "rotate(0deg)";
//         this.adaptiveSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
//         this.adaptiveSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
//     }
//
//     if (window.location.hash === '#/income') {
//         this.adaptiveSidebarIncome.classList.add('active');
//     } else {
//         this.adaptiveSidebarIncome.classList.remove('active');
//     }
//
//     if (window.location.hash === '#/expenses') {
//         this.adaptiveSidebarExpenses.classList.add('active');
//     } else {
//         this.adaptiveSidebarExpenses.classList.remove('active');
//     }
// }