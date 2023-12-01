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
let upgObjects = {};

window.addEventListener("load", () => reincarnateOpen());


//Example upgrade tree item
setupUpgTree({
    title: "testUpg0",
    name: "testUpg0",
    direction: "Y",
    infoBoxContent: "Dette er en test.",
    previousUpg: "firstUpg",
});

//example upgrade object

upgObjects["testUpg0"] = {
    name: "testUpg0",
    previousUpg: "firstUpg",
    price: 0,
    function: test,
};

upgObjects["firstUpg"] = {
    name: "firstUpg",
    previousUpg: "none",
    price: 0,
    function: test,
};


//Unit tests

unitTestBranches();
//unitTestSnake();

function unitTestBranches() {
    for (let i = 1; i <= 100; i++) {
        let previousUpg = allUpgradesPlaced[Math.floor(Math.random() * allUpgradesPlaced.length)];
        setupUpgTree({
            title: `testUpg${i}`,
            name: `testUpg${i}`,
            direction: allDirections[Math.floor(Math.random() * 4)],
            infoBoxContent: `Dette er en test ${i}.`,
            previousUpg: previousUpg,
        });
        
        upgObjects["testUpg" + i] = {
            name: "testUpg" + i,
            previousUpg: previousUpg,
            price: 0,
            function: test,
        };
    }
}
function unitTestSnake() {
    for (let i = 1; i <= 23; i++) {
        setupUpgTree({
            title: `testUpg${i}`,
            name: `testUpg${i}`,
            previousUpg: "testUpg" + (i - 1),
            direction: allDirections[Math.floor(Math.random() * 4)],
            infoBoxContent: `Dette er en test ${i}.`,
            previousUpg: "testUpg" + (i - 1),
        });

        upgObjects["testUpg" + i] = {
            name: "testUpg" + i,
            previousUpg: "testUpg" + (i - 1),
            price: 0,
            function: test,
        };
    }
}
//End unit tests

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
        console.log("Woopsie dwoopsie, fowige upgwade eksistewew ikke (baaaka) Fåw ikke plassert " + options.name + ". Gomenasai userchan UwU");
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
        <div class="upgTreeBox infoBox" Id="${options.name}" onclick="kjøpeReincarnationUpg('${options.name}')" style="${upgPlacement}">           
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

    for (let i = 0; i < allUpgradesPlaced.length; i++) {
        if (localStorage.getItem(allUpgradesPlaced[i]) == "bought") {
            let currentUpgHTML = document.getElementById(allUpgradesPlaced[i]);
            currentUpgHTML.style.opacity = 0.3;

            let connectedLines = document.getElementsByClassName(allUpgradesPlaced[i] + "Line");
            for (let i = 0; i < connectedLines.length; i++) {
                connectedLines[i].style.opacity = 0.3;
            }
        }
    }
}

function kjøpeReincarnationUpg(upg) {
    let upgObject = upgObjects[upg];

    if (localStorage.getItem(upg.name) == "bought") {
        return;
    }

    if (localStorage.getItem("reincarnationPoints") < upgObject.price) {
        console.log("Meow! Ikke nok weinkawasjowns-poweng. OwO");
        return;
    }

    if (localStorage.getItem(upgObject.previousUpg) != "bought" && upgObject.previousUpg != "none") {
        console.log("Nani? " + upgObject.previousUpg + " ew ikke kjøpt :/ Nyaa~");
        return;
    }

    localStorage.setItem("reincarnationPoints", localStorage.getItem("reincarnationPoints") - upgObject.price);
    localStorage.setItem(upgObject.name, "bought");

    let currentUpgHTML = document.getElementById(upgObject.name);
    currentUpgHTML.style.opacity = 0.3;

    let connectedLines = document.getElementsByClassName(upgObject.name + "Line");
    for (let i = 0; i < connectedLines.length; i++) {
        connectedLines[i].style.opacity = 0.3;
    }

    upgObject.function(upgObject);

    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
}

function test(upg) {
    console.log(upg.name + " kjøpt.");
}
