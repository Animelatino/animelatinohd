document.oncontextmenu = function (e) {
    if (e.button == 2) {
        e.preventDefault();
        return false;
    }
}