export class AdaptiveSidebarMove {
    constructor() {
        this.adaptiveHeaderBurger = document.getElementById('adaptive-header-burger');
        this.adaptiveSidebar = document.getElementById("adaptive-sidebar");
        this.adaptiveSidebarCross = document.getElementById('adaptive-sidebar-cross');

        const that = this;

        this.adaptiveHeaderBurger.onclick = function () {
            that.openAdaptiveSidebar();
        }

        this.adaptiveSidebarCross.onclick = function () {
            that.closeAdaptiveSidebar();
        }
    }

        openAdaptiveSidebar() {
            this.adaptiveSidebar.style.width = "250px";
        }

        closeAdaptiveSidebar() {
            this.adaptiveSidebar.style.width = "0";
        }
}

