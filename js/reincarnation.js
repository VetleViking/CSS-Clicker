let reincarnationPointsDiv = document.getElementById("reincarnationPoints");

window.addEventListener("load", () => reincarnateOpen());


function reincarnateOpen() {
    reincarnationPointsDiv.innerHTML = reincarnationPoints + " Reinkarnasjons-poeng.";
}