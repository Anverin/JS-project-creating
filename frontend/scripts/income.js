let categoriesBtn = document.getElementById('categories');
    categoriesBtn.onmouseover = activateCategories;

    function activateCategories () {
    categoriesBtn.classList.add('bg-danger');
}

categoriesBtn.onmouseout = desactivateCategories;

function desactivateCategories () {
    categoriesBtn.classList.remove('bg-danger');
}
