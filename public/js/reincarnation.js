let reincarnationPointsDiv = document.getElementById("reincarnationPoints");
let occupiedUpgCoords = [[6, 6]];
let allDirections = ["Y", "X", "-Y", "-X"];
let allUpgradesPlaced = ["linjeUpg1"];
let gridColumn = 0;
let gridRow = 0;
let direction;
let checkedDirections = [];
let placements = {};
placements["linjeUpg1X"] = "6";
placements["linjeUpg1Y"] = "6";
let upgObjects = {};
let chosenUpg = "";

window.addEventListener("load", () => reincarnateOpen());

async function fetchUpgrades() {
    const response = await fetch("../upgrades.json");
    //const response = await fetch("../upgrades2.json");
    upgrades = await response.json();
}

//Upgrade objects

upgObjects["testUpg0"] = {
    name: "testUpg0",
    previousUpg: "linjeUpg1",
    price: 0,
    function: test,
};

upgObjects["linjeUpg1"] = {
    name: "linjeUpg1",
    previousUpg: "none",
    price: 1,
    amount: 0.5,
    function: cssLinesMultiplier,
};

upgObjects["permUpg1"] = {
    name: "permUpg1",
    previousUpg: "linjeUpg1",
    price: 5,
    function: permUpg,
};

upgObjects["linjeUpg2"] = {
    name: "linjeUpg2",
    previousUpg: "linjeUpg1",
    price: 10,
    amount: 0.3,
    function: cssLinesMultiplier,
};

upgObjects["minigame"] = {
    name: "minigame",
    previousUpg: "permUpg1",
    price: 40,
    function: game,
};

console.log(upgObjects);

//Upgrade tree items
setupUpgTree({
    title: "testUpg0",
    name: "testUpg0",
    direction: "-Y",
    infoBoxContent: "Dette er en test 0.",
    previousUpg: "linjeUpg1",
});

setupUpgTree({
    title: "Permanent oppgradering",
    name: "permUpg1",
    direction: "Y",
    infoBoxContent: "Du kan velge en oppgradering å ha permanent.",
    previousUpg: "linjeUpg1",
});

setupUpgTree({
    title: "Linje-oppgradring 2",
    name: "linjeUpg2",
    direction: "X",
    infoBoxContent: "Gir deg 30% mer linjer.",
    previousUpg: "linjeUpg1",
});

setupUpgTree({
    title: "Minigame",
    name: "minigame",
    direction: "X",
    infoBoxContent: "Gir deg tilgang til et minigame.",
    previousUpg: "permUpg1",
});

//Unit tests

//unitTestBranches();
unitTestSnake();

function unitTestBranches() {
    for (let i = 1; i <= 100; i++) {
        let previousUpg = allUpgradesPlaced[Math.floor(Math.random() * allUpgradesPlaced.length)];
        upgObjects["testUpg" + i] = {
            name: "testUpg" + i,
            previousUpg: previousUpg,
            price: 0,
            function: test,
        };

        setupUpgTree({
            title: `testUpg${i}`,
            name: `testUpg${i}`,
            direction: allDirections[Math.floor(Math.random() * 4)],
            infoBoxContent: `Dette er en test ${i}.`,
            previousUpg: previousUpg,
        });
    }
}
function unitTestSnake() {
    for (let i = 1; i <= 23; i++) {
        upgObjects["testUpg" + i] = {
            name: "testUpg" + i,
            previousUpg: "testUpg" + (i - 1),
            price: 0,
            function: test,
        };

        setupUpgTree({
            title: `testUpg${i}`,
            name: `testUpg${i}`,
            previousUpg: "testUpg" + (i - 1),
            direction: allDirections[Math.floor(Math.random() * 4)],
            infoBoxContent: `Dette er en test ${i}.`,
            previousUpg: "testUpg" + (i - 1),
        });
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

    let upg = upgObjects[options.name];

    console.log(upgObjects);
    console.log(upg);

    let upgTree = document.getElementById("upgTree");
    let upgTreeHTML = `
        <div class="upgTreeBox infoBox" Id="${options.name}" onclick="kjøpeReincarnationUpg('${options.name}')" style="${upgPlacement}">           
            <p>
                ${options.title}<span class="tooltip">${options.infoBoxContent}</br>${upg.price} reinkarnasjons-poeng.</span>
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
        console.log("Meow! Ikke nok weinkawaswons-poweng. OwO");
        return;
    }

    if (localStorage.getItem(upgObject.previousUpg) != "bought" && upgObject.previousUpg != "none") {
        console.log("Nani? " + upgObject.previousUpg + " ew ikke kjøpt :/ Nyaa~");
        return;
    }

    upgObject.function(upgObject);
}

function kjøpeReincarnationUpg2(upg) {
    let upgObject = upgObjects[upg];

    localStorage.setItem("reincarnationPoints", parseInt(localStorage.getItem("reincarnationPoints")) - upgObject.price);
    localStorage.setItem(upgObject.name, "bought");

    let currentUpgHTML = document.getElementById(upgObject.name);
    currentUpgHTML.style.opacity = 0.3;

    let connectedLines = document.getElementsByClassName(upgObject.name + "Line");
    for (let i = 0; i < connectedLines.length; i++) {
        connectedLines[i].style.opacity = 0.3;
    }

    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
}

function test(upg) {
    if (localStorage.getItem(upg.name) == "bought") {
        return;
    }

    kjøpeReincarnationUpg2(upg.name);
}

function cssLinesMultiplier(upg) {
    if (localStorage.getItem(upg.name) == "bought") {
        return;
    }

    if (localStorage.getItem("totalReincarnationMultiplier") == undefined) {
        localStorage.setItem("totalReincarnationMultiplier", 0);
    }
    localStorage.setItem("totalReincarnationMultiplier", parseFloat(localStorage.getItem("totalReincarnationMultiplier")) + upg.amount);
    kjøpeReincarnationUpg2(upg.name);
}

function permUpg(upg) {
    let cssUpgradesBought = localStorage.getItem("allCssUpgradesBought");
    try {
        cssUpgradesBought = cssUpgradesBought.split(",");
    } catch (error) {
        console.log("Burde ikke skje uten juksing eller bruk av dev-branchen, slutt å jukse / snoke rundt.");
        return;
    }

    let cssUpgradesBoughtOld = cssUpgradesBought;

    for (let i = 0; i < cssUpgradesBoughtOld.length; i++) {
        if (upgrades.upgLevelCssUpgrades[cssUpgradesBoughtOld[i].replace(/\d+/g, "")] != undefined) {
            cssUpgradesBought = cssUpgradesBought.filter((item) => item !== cssUpgradesBoughtOld[i]);
        }
    }

    let cssUpgradesBoughtHtml = [];

    cssUpgradesBought.forEach((element) => {
        let currentUpg = upgrades.cssUpgrades[element];
        cssUpgradesBoughtHtml.push(`<div id="upgBought${currentUpg.name}">${currentUpg.title}</div>`);
    });

    let title = "Velg en oppgradering å ha permanent.";

    if (localStorage.getItem("chosenUpg") != null) {
        title = "Du har allerede valgt en oppgradering å ha permanent. Vil du bytte?";
    }

    let html = `
    <div class="choose">
        <div class="chooseWindow">
            <div class="chooseTitlebar">
                <p class="chooseTitle">${title}</p>
                <div class="chooseClose"><p>&times;</p></div>
            </div>
            <div class="chooseContent"></div>
            <div class="chooseButtons">
                <div class="chooseButton chooseButtonYe"><p>Ok</p></div>
                <div class="chooseButton chooseButtonNo"><p>Avbryt</p></div>
            </div>
        </div>
    </div>`;

    cssUpgradesBoughtHtml.forEach((element) => {
        let indexPos = html.search(`<div class="chooseContent">`);
        html = html.substring(0, indexPos) + element + html.substring(indexPos, html.length);
    });

    let template = document.createElement("template");
    template.innerHTML = html;

    document.body.appendChild(template.content);

    const confirmEl = document.querySelector(".choose");
    const btnClose = document.querySelector(".chooseClose");
    const btnOk = document.querySelector(".chooseButtonYe");
    const btnCancel = document.querySelector(".chooseButtonNo");

    confirmEl.addEventListener("click", (e) => {
        if (e.target === confirmEl) {
            close(confirmEl);
        }
    });

    btnOk.addEventListener("click", () => {
        if (chosenUpg != "") {
            localStorage.setItem("chosenUpg", chosenUpg);
            if (localStorage.getItem(upg.name) != "bought") {
                kjøpeReincarnationUpg2(upg.name);
            }
        } else if (localStorage.getItem("chosenUpg") == null) {
            console.log("Du må velge en oppgradering.");
            return;
        }

        close(confirmEl);
    });

    [btnCancel, btnClose].forEach((el) => {
        el.addEventListener("click", () => {
            let currentUpgHTML = document.getElementById(upg.name);
            currentUpgHTML.style.opacity = 1;
            let connectedLines = document.getElementsByClassName(upg.name + "Line");
            for (let i = 0; i < connectedLines.length; i++) {
                connectedLines[i].style.opacity = 1;
            }
            localStorage.removeItem(upg.name, "bought");
            close(confirmEl);
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.id.includes("upgBought")) {
            cssUpgradesBought.forEach((element) => {
                if (e.target.id.includes("upgBought" + element)) {
                    document.getElementById("upgBought" + element).style.backgroundColor = "gray";
                    chosenUpg = element;
                } else {
                    document.getElementById("upgBought" + element).style.backgroundColor = "white";
                }
            });
        }
    });

    function close(confirmEl) {
        confirmEl.classList.add("confirm--close");
        document.body.removeChild(confirmEl);
    }
}

function game(upg) {
    if (localStorage.getItem("minigame") == "bought") {
        return;
    }

    localStorage.setItem("minigame", "bought");

    kjøpeReincarnationUpg2(upg.name);
}

fetchUpgrades();
