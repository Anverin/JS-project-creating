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

// (function () {
//     const adaptiveHeaderBurger = document.getElementById('adaptive-header-burger');
//     const adaptiveSidebar = document.getElementById("adaptive-sidebar");
//     const adaptiveSidebarCross = document.getElementById('adaptive-sidebar-cross');
//
//     adaptiveHeaderBurger.onclick = function openAdaptiveSidebar() {
//         adaptiveSidebar.style.width = "250px";
//     }
//
//     adaptiveSidebarCross.onclick = function closeAdaptiveSidebar() {
//         adaptiveSidebar.style.width = "0";
//     }
//
// })();