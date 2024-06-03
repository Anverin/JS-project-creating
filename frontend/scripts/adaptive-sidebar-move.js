(function () {
    const adaptiveHeaderBurger = document.getElementById('adaptive-header-burger');
    const adaptiveSidebar = document.getElementById("adaptive-sidebar");
    const adaptiveSidebarCross = document.getElementById('adaptive-sidebar-cross');

    adaptiveHeaderBurger.onclick = function openAdaptiveSidebar() {
        adaptiveSidebar.style.width = "250px";
    }

    adaptiveSidebarCross.onclick = function closeAdaptiveSidebar() {
        adaptiveSidebar.style.width = "0";
    }

})();