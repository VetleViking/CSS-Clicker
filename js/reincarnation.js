let reincarnationPointsDiv = document.getElementById("reincarnationPoints");
localStorage.setItem("firstUpgX", "6");
localStorage.setItem("firstUpgY", "6");
let occupiedUpgCoords = [];
let allDirections = ["Y", "X", "-Y", "-X"];
let gridColumn = 0;
let gridRow = 0;


window.addEventListener("load", () => reincarnateOpen());

function reincarnateOpen() {
    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
}

setupUpgTree({
    title: "Reinkarnasjons-poeng",
    name: "reincarnationPoints",
    direction: "Y",
    infoBoxContent: "Du får reinkarnasjons-poeng ved å reinkarnere. Disse kan brukes til å kjøpe oppgraderinger.",
    previousUpg: "firstUpg",
});

setupUpgTree({
    title: "Reinkarnasjons-poeng per sekund",
    name: "reincarnationPointsPerSec",
    direction: "Y",
    infoBoxContent: "Du får reinkarnasjons-poeng per sekund. Dette er basert på hvor mange reinkarnasjons-poeng du har.",
    previousUpg: "reincarnationPoints",
});

setupUpgTree({
    title: "Reinkarnasjons-poeng per klikk",
    name: "reincarnationPointsPerClick",
    direction: "Y",
    infoBoxContent: "Du får reinkarnasjons-poeng per klikk. Dette er basert på hvor mange reinkarnasjons-poeng du har.",
    previousUpg: "reincarnationPoints",
});

function setupUpgTree(options) {
    options = Object.assign(
        {},
        {
            title: "",
            name: "",
            direction: "",
            infoBoxContent: "",
            previousUpg: "",
        },
        options
    );

    

    let X = parseInt(localStorage.getItem(options.previousUpg + "X"));
    let Y = parseInt(localStorage.getItem(options.previousUpg + "Y"));
    
    console.log(X, Y);

    gridColumn, gridRow = checkCoords(options.direction, X, Y);

    console.log(gridColumn, gridRow);

    let upgPlacement = "grid-column: " + gridColumn + "; grid-row: " + gridRow + ";";

    let upgTree = document.getElementById("upgTree");
    let upgTreeHTML = `
        <div class="upgTreeBox infoBox" onclick="kjøpeReincarnationUpg(${options.name})" style="${upgPlacement}">           
            <p>
                ${options.title}<span class="tooltip">${options.infoBoxContent}</span>
            </p>     
        </div>  
    `;
    upgTree.innerHTML += upgTreeHTML;
    localStorage.setItem(options.name + "X", gridColumn);
    localStorage.setItem(options.name + "Y", gridRow);

    occupiedUpgCoords.push([gridColumn, gridRow]);
    console.log(occupiedUpgCoords);
}



function checkCoords(direction, X, Y) {

    if (direction == "Y") {
        console.log("Y");
        gridColumn = X;
        gridRow = Y - 2;
    } else if (direction == "X") {
        console.log("X");
        gridColumn = X + 2;
        gridRow = Y;
    } else if (direction == "-Y") {
        gridColumn = X;
        gridRow = Y + 2;
    } else if (direction == "-X") {
        gridColumn = X - 2;
        gridRow = Y;
    }

    console.log(occupiedUpgCoords[1] == ([gridColumn, gridRow].toString()))

    occupiedUpgCoords.forEach((element) => {
        if (element == ([gridColumn, gridRow].toString())) {
            console.log("Occupied");
            gridColumn = X;
            gridRow = Y;
            let newDirection = allDirections[allDirections.indexOf(direction) + 1];
            checkCoords(newDirection, X, Y);
        }
    });
    

    return gridColumn, gridRow;
}