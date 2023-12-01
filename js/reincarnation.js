let reincarnationPointsDiv = document.getElementById("reincarnationPoints");
let occupiedUpgCoords = [[6, 6]];
let allDirections = ["Y", "X", "-Y", "-X"];
let allUpgradesPlaced = ["firstUpg"];
let gridColumn = 0;
let gridRow = 0;
let direction;
let checkedDirections = [];
let placements = {};
placements["firstUpgX"] = "6";
placements["firstUpgY"] = "6";

window.addEventListener("load", () => reincarnateOpen());

setupUpgTree({
    title: "testUpg0",
    name: "testUpg0",
    direction: "Y",
    infoBoxContent: "Dette er en test.",
    previousUpg: "firstUpg",
});

const firstUpg = Object.assign(
    {},
    {
        name: "firstUpg",
        price: 0,
        function: test,
    }
);

for (let i = 1; i <= 23; i++) {
    setupUpgTree({
        title: `testUpg${i}`,
        name: `testUpg${i}`,
        direction: allDirections[Math.floor(Math.random() * 4)],
        infoBoxContent: `Dette er en test ${i}.`,
        previousUpg: allUpgradesPlaced[Math.floor(Math.random() * allUpgradesPlaced.length)],
    });
}

let upgObjects = {};

for (let i = 1; i <= 23; i++) {
    upgObjects["testUpg" + i] = {
        name: "testUpg" + i,
        price: 0,
        function: test,
    };

    console.log(firstUpg);
    console.log(upgObjects["testUpg" + i]);
}

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

    let X = parseInt(placements[options.previousUpg + "X"]);
    let Y = parseInt(placements[options.previousUpg + "Y"]);

    if (!Number.isInteger(Y) || !Number.isInteger(X)) {
        console.log("Woopsie dwoopsie, fowige upgwade eksistewew ikke (baaaka) Fåw ikke plassert " + options.name + " gomenasai userchan UwU");
        return;
    }

    checkedDirections = [];
    direction = checkCoords(options.direction, X, Y);

    if (direction == false) {
        console.log("Woopsie UwU, ikke pwass til " + options.name + " OwO");
        return;
    }

    let upgPlacement = "grid-column: " + gridColumn + "; grid-row: " + gridRow + ";";

    let upgTree = document.getElementById("upgTree");
    let upgTreeHTML = `
        <div class="upgTreeBox infoBox" Id="${options.name}" onclick="kjøpeReincarnationUpg(${options.name})" style="${upgPlacement}">           
            <p>
                ${options.title}<span class="tooltip">${options.infoBoxContent}</span>
            </p>     
        </div>  
    `;

    upgTreeHTML += placeLine(X, Y, direction, options.previousUpg);

    upgTree.innerHTML += upgTreeHTML;

    placements[options.name + "X"] = gridColumn;
    placements[options.name + "Y"] = gridRow;
    occupiedUpgCoords.push([gridColumn, gridRow]);
    allUpgradesPlaced.push(options.name);
}

function placeLine(X, Y, direction, previousUpg) {
    let linjeX = X;
    let linjeY = Y;

    if (direction == "Y") {
        linjeY = Y - 1;
    } else if (direction == "X") {
        linjeX = X + 1;
    } else if (direction == "-Y") {
        linjeY = Y + 1;
    } else if (direction == "-X") {
        linjeX = X - 1;
    }

    let linjeClass = "linje" + direction.split("-").pop();

    let linePlacement = "grid-column: " + linjeX + "; grid-row: " + linjeY + ";";

    return `<div class="${linjeClass} ${previousUpg + "Line"}" style="${linePlacement}"></div>`;
}

function checkCoords(direction, X, Y) {
    gridColumn = X;
    gridRow = Y;
    checkedDirections.push(direction);

    if (checkedDirections.length >= 5) {
        return false;
    }

    if (direction == "Y") {
        gridRow -= 2;
    } else if (direction == "X") {
        gridColumn += 2;
    } else if (direction == "-Y") {
        gridRow += 2;
    } else if (direction == "-X") {
        gridColumn -= 2;
    }

    for (let i = 0; i < occupiedUpgCoords.length; i++) {
        if (occupiedUpgCoords[i] == [gridColumn, gridRow].toString() || gridColumn < 1 || gridRow < 1 || gridColumn > 11 || gridRow > 11) {
            direction = allDirections[allDirections.indexOf(direction) + 1];
            if (direction == undefined) {
                direction = allDirections[0];
            }
            return checkCoords(direction, X, Y, 2);
        }
    }

    return direction;
}

function reincarnateOpen() {
    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
}

function kjøpeReincarnationUpg(upg) {
    console.log(upgObjects["testUpg" + 1]);

    //noe feil med navnet som blir sendt inn eller noe, må fikse det senere

    // if (localStorage.getItem(upg.name) == "bought") {
    //     console.log("Du har allerede kjøpt denne oppgraderingen.");
    //     return;
    // }

    if (localStorage.getItem("reincarnationPoints") < upg.price) {
        console.log("Du har ikke nok reinkarnasjons-poeng.");
        return;
    }

    localStorage.setItem("reincarnationPoints", localStorage.getItem("reincarnationPoints") - upg.price);
    localStorage.setItem(upg.name, "bought");

    let currentUpgHTML = document.getElementById(upg.name);
    currentUpgHTML.style.opacity = 0.3;

    let connectedLines = document.getElementsByClassName(upg.name + "Line");
    for (let i = 0; i < connectedLines.length; i++) {
        connectedLines[i].style.opacity = 0.3;
    }

    upg.function();

    reincarnateOpen();
}

function test() {
    console.log("test");
}
