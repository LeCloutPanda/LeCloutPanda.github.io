function openTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function openPage(url) {
    var win = window.open(url, '_self');
    win.focus();
}

function hideModList() {
    document.getElementById("FullScreen").style.display = "none";
}

function showModsList() {
    document.getElementById("FullScreen").style.display = "block";
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27) hideModList();
});