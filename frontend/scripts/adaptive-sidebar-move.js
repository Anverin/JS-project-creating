document.getElementById('adaptive-header-burger').onclick = function openAdaptiveSidebar() {
    document.getElementById("adaptive-sidebar").style.width = "250px";
}

document.getElementById('adaptive-sidebar-cross').onclick = function closeAdaptiveSidebar() {
    document.getElementById("adaptive-sidebar").style.width = "0";
}
