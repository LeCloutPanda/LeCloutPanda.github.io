function openTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function openPage(url) {
    document.getElementById("Preloader").style.visibility = "visible";
    var win = window.open(url, '_self');
    win.focus();
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id).querySelector(".dropdownMenu");
    dropdown.style.maxHeight = dropdown.style.maxHeight === "0px" ? "256px" : "0px";
}

function openPage(url) {
    window.open(url, "_blank");
}