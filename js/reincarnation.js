let reincarnationPointsDiv = document.getElementById("reincarnationPoints");

window.addEventListener("load", () => reincarnateOpen());

function reincarnateOpen() {
    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
    console.log(localStorage.getItem("reincarnationPoints"));
}
