function openTab(url) {
    var win = window.open(url, '_blank');
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

// <div id="LinkElement" onclick='openTab("https://www.paypal.com/paypalme/lecloutpanda")'> 
//     <img src="resources/logos/paypal_logo.svg" height="32" width="32">               
//     <p>Paypal</p>
// </div>