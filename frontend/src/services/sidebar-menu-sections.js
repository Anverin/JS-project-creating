export class SidebarMenuSections {
    constructor() {
        this.normalSidebarMain = document.getElementById('normal-sidebar-main');
        this.normalSidebarMainSvgWhite = document.getElementById('normal-sidebar-main-svg-white');
        this.normalSidebarMainSvgDark = document.getElementById('normal-sidebar-main-svg-dark');

        this.normalSidebarIE = document.getElementById('normal-sidebar-i&e');
        this.normalSidebarIESvgWhite = document.getElementById('normal-sidebar-i&e-svg-white');
        this.normalSidebarIESvgDark = document.getElementById('normal-sidebar-i&e-svg-dark');

        this.normalSidebarCategories = document.getElementById('normal-sidebar-categories');
        this.normalSidebarCategoriesSvgWhite = document.getElementById('normal-sidebar-categories-svg-white');
        this.normalSidebarCategoriesSvgDark = document.getElementById('normal-sidebar-categories-svg-dark');
        this.normalSidebarIncome = document.getElementById('normal-sidebar-income');
        this.normalSidebarExpenses = document.getElementById('normal-sidebar-expenses');



        this.adaptiveSidebarMain = document.getElementById('adaptive-sidebar-main');
        this.adaptiveSidebarMainSvgWhite = document.getElementById('adaptive-sidebar-main-svg-white');
        this.adaptiveSidebarMainSvgDark = document.getElementById('adaptive-sidebar-main-svg-dark');

        this.adaptiveSidebarIE = document.getElementById('adaptive-sidebar-i&e');
        this.adaptiveSidebarIESvgWhite = document.getElementById('adaptive-sidebar-i&e-svg-white');
        this.adaptiveSidebarIESvgDark = document.getElementById('adaptive-sidebar-i&e-svg-dark');

        this.adaptiveSidebarCategories = document.getElementById('adaptive-sidebar-categories');
        this.adaptiveSidebarCategoriesSvgWhite = document.getElementById('adaptive-sidebar-categories-svg-white');
        this.adaptiveSidebarCategoriesSvgDark = document.getElementById('adaptive-sidebar-categories-svg-dark');

        this.adaptiveSidebarIncome = document.getElementById('adaptive-sidebar-income');
        this.adaptiveSidebarExpenses = document.getElementById('adaptive-sidebar-expenses');

    }

    changeSections() {
         if (window.location.hash === '#/') {
            this.normalSidebarMain.classList.add('active');
            this.normalSidebarMainSvgWhite.classList.remove('d-none');
            this.normalSidebarMainSvgDark.classList.add('d-none');
        } else {
            this.normalSidebarMain.classList.remove('active');
            this.normalSidebarMainSvgWhite.classList.add('d-none');
            this.normalSidebarMainSvgDark.classList.remove('d-none');
        }

        if (window.location.hash === '#/income-and-expenses') {
            this.normalSidebarIE.classList.add('active');
            this.normalSidebarIESvgWhite.classList.remove('d-none');
            this.normalSidebarIESvgDark.classList.add('d-none');
        } else {
            this.normalSidebarIE.classList.remove('active');
            this.normalSidebarIESvgWhite.classList.add('d-none');
            this.normalSidebarIESvgDark.classList.remove('d-none');
        }

        if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
            this.normalSidebarCategories.classList.add('active');
            this.normalSidebarCategoriesSvgWhite.classList.remove('d-none');
            this.normalSidebarCategoriesSvgDark.classList.add('d-none');
            this.normalSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.normalSidebarCategories.classList.remove('active');
            this.normalSidebarCategoriesSvgWhite.classList.add('d-none');
            this.normalSidebarCategoriesSvgDark.classList.remove('d-none');
            this.normalSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.normalSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
        }

        if (window.location.hash === '#/income') {
            this.normalSidebarIncome.classList.add('bg-primary', 'text-white');
        } else {
            this.normalSidebarIncome.classList.remove('bg-primary', 'text-white');
        }

        if (window.location.hash === '#/expenses') {
            this.normalSidebarExpenses.classList.add('bg-primary', 'text-white');
        } else {
            this.normalSidebarExpenses.classList.remove('bg-primary', 'text-white');
        }




        if (window.location.hash === '#/') {
            this.adaptiveSidebarMain.classList.add('active');
            this.adaptiveSidebarMainSvgWhite.classList.remove('d-none');
            this.adaptiveSidebarMainSvgDark.classList.add('d-none');
        } else {
            this.adaptiveSidebarMain.classList.remove('active');
            this.adaptiveSidebarMainSvgWhite.classList.add('d-none');
            this.adaptiveSidebarMainSvgDark.classList.remove('d-none');
        }

        if (window.location.hash === '#/income-and-expenses') {
            this.adaptiveSidebarIE.classList.add('active');
            this.adaptiveSidebarIESvgWhite.classList.remove('d-none');
            this.adaptiveSidebarIESvgDark.classList.add('d-none');
        } else {
            this.adaptiveSidebarIE.classList.remove('active');
            this.adaptiveSidebarIESvgWhite.classList.add('d-none');
            this.adaptiveSidebarIESvgDark.classList.remove('d-none');
        }

        if (window.location.hash === '#/income' || window.location.hash === '#/expenses') {
            this.adaptiveSidebarCategories.classList.add('active');
            this.adaptiveSidebarCategoriesSvgWhite.classList.remove('d-none');
            this.adaptiveSidebarCategoriesSvgDark.classList.add('d-none');
            this.adaptiveSidebarIncome.classList.add('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpenses.classList.add('border', 'border-top-0', 'border-primary');
        } else {
            this.adaptiveSidebarCategories.classList.remove('active');
            this.adaptiveSidebarCategoriesSvgWhite.classList.add('d-none');
            this.adaptiveSidebarCategoriesSvgDark.classList.remove('d-none');
            this.adaptiveSidebarIncome.classList.remove('border-start', 'border-end', 'border-primary');
            this.adaptiveSidebarExpenses.classList.remove('border', 'border-top-0', 'border-primary');
        }

        if (window.location.hash === '#/income') {
            this.adaptiveSidebarIncome.classList.add('bg-primary', 'text-white');
        } else {
            this.adaptiveSidebarIncome.classList.remove('bg-primary', 'text-white');
        }

        if (window.location.hash === '#/expenses') {
            this.adaptiveSidebarExpenses.classList.add('bg-primary', 'text-white');
        } else {
            this.adaptiveSidebarExpenses.classList.remove('bg-primary', 'text-white');
        }
}

}