let cssLines = 0;
let cssLinesTotal = 0;
let cssLinesTotalTotal = 0;
let dollaridoos = 0;
let allCssUpgradesBought = [];
let allDollaridoosUpgradesBought = [];
let totalMultiplier = 1;
let totalAutoMultiplier = 1;
let totalPlus = 0;
let dollarUnlocked = false;
let isGolden = false; // lets isGolden to be false
let currentText;
let goldenLineInterval;
let autoInterval;
let boughtDollarIncrementals = [];
let boughtCssIncrementals = [];
let upgrades;
const shopDollarDiv = document.getElementById("shopDollarDiv");
const shopCssDiv = document.getElementById("shopCssDiv");

// probably going to remove this, dont want text to img forever.
var img;
var imageBase64;
var backgroundColor;
var font = "16px Times New Roman";
var textColor = "#000000";

async function fetchUpgrades() {
    const response = await fetch("../upgrades.json")
    //const response = await fetch("../upgrades2.json");
    upgrades = await response.json();
}

// Function to save the game automatically
function autoSave() {
    setInterval(function () {
        saveGame();
    }, 5000);
}

// Function to save the game
function saveGame() {
    localStorage.setItem("cssLines", cssLines);
    localStorage.setItem("cssLinesTotal", cssLinesTotal);
    localStorage.setItem("cssLinesTotalTotal", cssLinesTotalTotal);
    localStorage.setItem("dollaridoos", dollaridoos);
    localStorage.setItem("allCssUpgradesBoughtCurrent", allCssUpgradesBought);
    localStorage.setItem("allDollaridoosUpgradesBoughtCurrent", allDollaridoosUpgradesBought);
    localStorage.setItem("dollarUnlocked", dollarUnlocked);
}

// Function on load of the game
function onOpen() {
    let allCssUpgradesBoughtCurrent = localStorage.getItem("allCssUpgradesBoughtCurrent") == null ? [] : localStorage.getItem("allCssUpgradesBoughtCurrent").split(",");
    let allDollaridoosUpgradesBoughtCurrent = localStorage.getItem("allDollaridoosUpgradesBoughtCurrent") == null ? [] : localStorage.getItem("allDollaridoosUpgradesBoughtCurrent").split(",");
    const dollaridoosHtml = document.getElementById("dollaridoos");
     
    if (localStorage.getItem("dollarUnlocked") == "true") {
        selgeSide2(true);
        dollaridoos = parseInt(localStorage.getItem("dollaridoos"));
        dollaridoosHtml.innerHTML = dollaridoos + "$";
    }

    stopGoldenLineInterval();

    allCssUpgradesBoughtCurrent.forEach((element) => {
        if (upgrades.cssUpgrades[element] != undefined) {
            buyCssUpg(upgrades.cssUpgrades[element], true);
        } else if (upgrades.upgLevelCssUpgrades[element.replace(/\d+/g, "")] != undefined) {
            buyCssUpg(upgrades.upgLevelCssUpgrades[element.replace(/\d+/g, "")], true);
        }
    });

    allDollaridoosUpgradesBoughtCurrent.forEach((element) => {
        if (upgrades.dollarUpgrades[element] != undefined) {
            buyDollarUpg(upgrades.dollarUpgrades[element], true);
        } else if (upgrades.upgLevelDollarUpgrades[element.replace(/\d+/g, "")] != undefined) {
            buyDollarUpg(upgrades.upgLevelDollarUpgrades[element.replace(/\d+/g, "")], true);
        }
    });

    if (localStorage.getItem("cssLines") != null) {
        cssLines = parseInt(localStorage.getItem("cssLines"));
        cssLinesTotal = parseInt(localStorage.getItem("cssLinesTotal"));
        cssLinesTotalTotal = parseInt(localStorage.getItem("cssLinesTotalTotal"));

        checkCssLines();
    }

    if (localStorage.getItem("chosenUpg") != null && !allCssUpgradesBought.includes(localStorage.getItem("chosenUpg"))) {
        buyCssUpg(upgrades.cssUpgrades[localStorage.getItem("chosenUpg")]);
    }
}


function setupLevelCssUpgrades() {
    const shopLevelCssDiv = document.getElementById("shopLevelCssDiv");

    shopLevelCssDiv.innerHTML = "";
    for (let i = 0; i < Object.entries(upgrades.upgLevelCssUpgrades).length; i++) {
        let currentUpg = Object.entries(upgrades.upgLevelCssUpgrades)[i][1];

        currentUpg.price /= currentUpg.upgradeIncrement ** (parseInt(currentUpg.name.match(/\d+/g)) - 1);
        currentUpg.name = currentUpg.name.replace(/\d+/g, "") + 1;
        currentUpg.title = currentUpg.title.replace(/\d+/g, "") + 1;

        addCssUpgrade(currentUpg);
        if (i >= 3) {
            return;
        }
    }
}

function setupCssUpgrades() {
    shopCssDiv.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        let currentUpg = Object.entries(upgrades.cssUpgrades)[i][1];

        addCssUpgrade(currentUpg);
    }
}

function setupLevelDollarUpgrades() {
    const shopLevelDollarDiv = document.getElementById("shopLevelDollarDiv");

    shopLevelDollarDiv.innerHTML = "";
    for (let i = 0; i < Object.entries(upgrades.upgLevelDollarUpgrades).length; i++) {
        let currentUpg = Object.entries(upgrades.upgLevelDollarUpgrades)[i][1];

        currentUpg.price /= currentUpg.upgradeIncrement ** (parseInt(currentUpg.name.match(/\d+/g)) - 1);
        currentUpg.name = currentUpg.name.replace(/\d+/g, "") + 1;
        currentUpg.title = currentUpg.title.replace(/\d+/g, "") + 1;

        addDollarUpgrade(currentUpg);
        if (i >= 3) {
            return;
        }
    }
}

function setupDollarUpgrades() {
    shopDollarDiv.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        let currentUpg = Object.entries(upgrades.dollarUpgrades)[i][1];

        addDollarUpgrade(currentUpg);
    }
}

function addCssUpgrade(upg) {
    let html = document.createElement("div");

    html.innerHTML = `
    <div class="shopItem infoBox" id="${upg.name}Shop">
        <p>
            ${upg.title}: ${upg.price} linjer <span class="tooltip"
                >${upg.toolTip}</br>Gir ${upg.amount} ekstra linje(r) hver gang du skriver.</span>
        </p>
    </div>`;

    if (upg.isIncremental == true) {
        const shopLevelCssDiv = document.getElementById("shopLevelCssDiv");

        html.querySelector(".tooltip").innerHTML += `</br>Denne oppgraderingen kan kjøpes flere ganger.`;
        shopLevelCssDiv.appendChild(html);
        eventListener(upg);
        return;
    }

    shopCssDiv.appendChild(html);
    eventListener(upg);
}

function addDollarUpgrade(upg) {
    let html = document.createElement("div");

    html.innerHTML = `
    <div class="shopDollarItem infoBox" id="${upg.name}Shop">
        <p>
            ${upg.title}: ${upg.price}$<span class="tooltip">${upg.toolTip}<br /></span>
        </p>
    </div>
    `;

    if (upg.type == "multiplier") {
        html.querySelector(".tooltip").innerHTML += `Legger til ${upg.amount} i multiplier til mengden linjer du får når du skriver`;
    } else if (upg.type == "auto") {
        html.querySelector(".tooltip").innerHTML += `Gir deg en linje hvert ${upg.amount}. sekund.`;
    } else if (upg.type == "autoMultiplier") {
        html.querySelector(".tooltip").innerHTML += `Ganger outputet fra de oppgraderingene du får css automatisk fra med ${upg.amount}.`;
    }

    if (upg.isIncremental == true) {
        const shopLevelDollarDiv = document.getElementById("shopLevelDollarDiv");

        html.querySelector(".tooltip").innerHTML += `</br>Denne oppgraderingen kan kjøpes flere ganger.`;
        shopLevelDollarDiv.appendChild(html);
        eventListener(upg);
        return;
    }

    shopDollarDiv.appendChild(html);
    eventListener(upg);
}

function eventListener(upg) {
    document.getElementById(`${upg.name}Shop`).addEventListener("click", function () {
        if (document.getElementById(`${upg.name}Shop`).classList.contains("shopDollarItem")) {
            buyDollarUpg(upg);
        } else if (document.getElementById(`${upg.name}Shop`).classList.contains("shopItem")) {
            buyCssUpg(upg);
        }
    });
}

function buyCssUpg(upg, alreadyBought = false) {
    if ((cssLines < upg.price || allCssUpgradesBought.includes(upg.name)) && !alreadyBought) {
        return;
    }    

    const cssUpgradesBoughtBox = document.getElementById("cssUpgradesBoughtBox");

    if (!alreadyBought) {
        cssLines -= upg.price;
    }

    checkCssLines();

    let upgHtml = document.getElementsByTagName("body")[0];

    upgHtml.classList.add(upg.name);

    totalPlus += upg.amount;

    allCssUpgradesBought.push(upg.name);

    let isAllCSSBought = localStorage.getItem("allCssUpgradesBought") == null;

    if ((isAllCSSBought || !localStorage.getItem("allCssUpgradesBought").includes(upg.name))) {
        localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
    } if (upg.isIncremental == true) {
        boughtCssIncrementals.push(upg.name);
    }

    let shopItem = document.getElementById(`${upg.name}Shop`);
    if (shopItem != null) {
        shopItem.parentElement.remove();
    }

    addUpgBought2(upg, cssUpgradesBoughtBox);
    addNextShopItem2(upgrades.cssUpgrades, shopCssDiv);
    linesPerLineWritten();   
    saveGame();
}

function buyDollarUpg(upg, alreadyBought = false) {
    if ((dollaridoos < upg.price || allDollaridoosUpgradesBought.includes(upg.name)) && !alreadyBought) {
        return;
    }

    const dollarUpgradesBoughtBox = document.getElementById("dollarUpgradesBoughtBox");
    const dollaridoosHtml = document.getElementById("dollaridoos");

    if (!alreadyBought) {
        dollaridoos -= upg.price;
    }

    dollaridoosHtml.innerHTML = dollaridoos + "$";

    allDollaridoosUpgradesBought.push(upg.name);

    if (upg.type == "auto") {
        autoInterval = setInterval(function () {
            let reincarnationPts = localStorage.getItem("reincarnationPointsTotal") == null ? 0 : parseInt(localStorage.getItem("reincarnationPointsTotal"));
            let reincarnationMultiplier = localStorage.getItem("totalReincarnationMultiplier") == null ? 0 : parseFloat(localStorage.getItem("totalReincarnationMultiplier"));
            let n = Math.floor(1 * totalAutoMultiplier * (1 + reincarnationPts / 10) * (1 + reincarnationMultiplier));
            cssLines += n;
            cssLinesTotal += n;
            cssLinesTotalTotal += n;
            checkCssLines();
        }, upg.amount * 1000);
    }
    if (upg.type == "multiplier") {
        totalMultiplier += upg.amount;
    }
    if (upg.type == "autoMultiplier") {
        totalAutoMultiplier *= upg.amount;
    }
    if (upg.isIncremental == true) {
        boughtDollarIncrementals.push(upg.name);
    }

    let shopItem = document.getElementById(`${upg.name}Shop`);
    if (shopItem != null) {
        shopItem.parentElement.remove();
    }

    addUpgBought2(upg, dollarUpgradesBoughtBox);
    addNextShopItem2(upgrades.dollarUpgrades, shopDollarDiv);
    linesPerLineWritten();
    saveGame();
}

function checkCssLines() {
    const numHtml = document.getElementById("number");
    const selgeSideBtn = document.getElementById("btnSelgeSide");
    if (cssLines == 1) {
        numHtml.innerHTML = cssLines + " linje";
    } else {
        numHtml.innerHTML = cssLines + " linjer";
    }

    if (cssLinesTotal >= 30) {
        selgeSideBtn.style.display = "block";
    }
    if (cssLinesTotalTotal >= 10000) {
        const reincarnationBtn = document.getElementById("btnReinkarnasjon");

        reincarnationBtn.style.display = "block";
    }
}

function addNextShopItem2(upgObjects, shopDiv) {
    let shouldReturn = false;

    boughtDollarIncrementals.forEach((element) => {
        if (allDollaridoosUpgradesBought[allDollaridoosUpgradesBought.length - 1] == element && shopDiv == shopDollarDiv) {
            let upg = upgrades.upgLevelDollarUpgrades[element.replace(/\d+/g, "")];

            upg.price *= upg.upgradeIncrement;
            upg.name = upg.name.replace(/\d+/g, "") + (parseInt(upg.name.match(/\d+/g)) + 1);
            upg.title = upg.title.replace(/\d+/g, "") + (parseInt(upg.title.match(/\d+/g)) + 1);

            addDollarUpgrade(upg);
            shouldReturn = true;
            return;
        }
    });

    boughtCssIncrementals.forEach((element) => {
        if (allCssUpgradesBought[allCssUpgradesBought.length - 1] == element && shopDiv == shopCssDiv) {
            let upg = upgrades.upgLevelCssUpgrades[element.replace(/\d+/g, "")];

            upg.price *= upg.upgradeIncrement;
            upg.name = upg.name.replace(/\d+/g, "") + (parseInt(upg.name.match(/\d+/g)) + 1);
            upg.title = upg.title.replace(/\d+/g, "") + (parseInt(upg.title.match(/\d+/g)) + 1);

            addCssUpgrade(upg);
            shouldReturn = true;
            return;
        }
    });

    if (shouldReturn) {
        return;
    }

    for (let i = 0; i < Object.entries(upgObjects).length; i++) {
        let currentUpg = Object.entries(upgObjects)[i][1];
        if (shopDiv == shopCssDiv) {
            if (!allCssUpgradesBought.includes(currentUpg.name) && document.getElementById(`${currentUpg.name}Shop`) == null) {
                addCssUpgrade(currentUpg);
                return;
            }
        } else if (shopDiv == shopDollarDiv) {
            if (!allDollaridoosUpgradesBought.includes(currentUpg.name) && document.getElementById(`${currentUpg.name}Shop`) == null) {
                addDollarUpgrade(currentUpg);
                return;
            }
        }
    }

    if (shopDiv.innerHTML == "") {
        shopDiv.innerHTML = "Du har kjøpt alle oppgraderingene i denne kategorien!";
    }
}

function addUpgBought2(upg, type) {
    let html = document.createElement("div");

    html.innerHTML = `
        <div class="upgradesBoughtItem infoBox" id="${upg.name}UpgradesBought"><p>${upg.title}<span class="tooltip">${upg.toolTip}<br /></span></p></div>
    `;
    if (upg.type == "multiplier") {
        html.querySelector(".tooltip").innerHTML += `Legger til ${upg.amount} i multiplier til mengden linjer du får når du skriver`;
    } else if (upg.type == "auto") {
        html.querySelector(".tooltip").innerHTML += `Gir deg en linje hvert ${upg.amount}. sekund.`;
    } else if (upg.type == "autoMultiplier") {
        html.querySelector(".tooltip").innerHTML += `Ganger outputet fra de oppgraderingene du får css automatisk fra med ${upg.amount}.`;
    }
    if (upgrades.cssUpgrades[upg.name] != null || upgrades.upgLevelCssUpgrades[upg.name.replace(/\d+/g, "")] != null) {
        html.querySelector(".tooltip").innerHTML += `Gir ${upg.amount} ekstra linje(r) hver gang du skriver.`;
    }

    if (upg.isIncremental == true) {
        let nameToRemove = upg.name.replace(/\d+/g, "") + (parseInt(upg.name.match(/\d+/g)) - 1);
        if (document.getElementById(`${nameToRemove}UpgradesBought`) != null) {
            document.getElementById(`${nameToRemove}UpgradesBought`).remove();
            let upgHtml = document.getElementsByTagName("body")[0];
            upgHtml.classList.remove(nameToRemove);
        }
    }

    type.appendChild(html);

    if (allCssUpgradesBought.length <= 1 && allDollaridoosUpgradesBought.length <= 1) {
        const upgradesBoughtBox = document.getElementById("upgradesBought");
        const upgradesBoughtText = document.getElementById("upgradesBoughtText");

        upgradesBoughtBox.style.display = "block";
        upgradesBoughtText.style.display = "block";
    }
    if (allDollaridoosUpgradesBought.length >= 1 && allCssUpgradesBought.length >= 1) {
        const upgradesBoughtCssText = document.getElementById("upgradesBoughtCssText");
        const upgradesBoughtDollarText = document.getElementById("upgradesBoughtDollarText");

        upgradesBoughtCssText.style.display = "block";
        upgradesBoughtDollarText.style.display = "block";
        if (allCssUpgradesBought.includes("border") && allCssUpgradesBought.includes("grid")) {
            const cssUpgradesBoughtBox = document.getElementById("cssUpgradesBoughtBox");

            upgradesBoughtCssText.style.borderRight = "1px solid black";
            cssUpgradesBoughtBox.style.borderRight = "1px solid black";
        }
    }
}

function selgeSide2(onOpen = false) {
    if (cssLines >= 50 || onOpen == true) {
        const dollaridoosHtml = document.getElementById("dollaridoos");
        const rightOrNot = document.getElementById("rightOrNot");
        const selgeSideBtn = document.getElementById("btnSelgeSide");
        const cssShopText = document.getElementById("shopCssText");
        const dollarShopText = document.getElementById("shopDollarText");
        const upgradesBoughtCssText = document.getElementById("upgradesBoughtCssText");
        const cssUpgradesBoughtBox = document.getElementById("cssUpgradesBoughtBox");
        const shopLevelDollarText = document.getElementById("shopLevelDollarText");

        if (dollarUnlocked == false) {
            const dollaridoosUnlockedHtml = document.getElementsByClassName("dollaridoos");

            for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
                dollaridoosUnlockedHtml[i].classList.add("dollarUnlocked");
            }
            dollarShopText.style.display = "block";
            cssShopText.style.display = "block";
            setupDollarUpgrades();
            setupLevelDollarUpgrades();
        }
        dollaridoos += Math.floor(cssLinesTotal / 10);

        cssLines = 0;
        totalPlus = 0;
        cssLinesTotal = 0;
        checkCssLines();
        dollaridoosHtml.innerHTML = dollaridoos + "$";
        dollaridoosHtml.style.display = "block";
        shopLevelDollarText.style.display = "block";
        cssUpgradesBoughtBox.innerHTML = "";

        upgradesBoughtCssText.style.display = "none";
        upgradesBoughtCssText.style.borderRight = "none";
        cssUpgradesBoughtBox.style.borderRight = "none";

        if (allDollaridoosUpgradesBought.length <= 0) {
            const upgradesBoughtText = document.getElementById("upgradesBoughtText");

            upgradesBoughtText.style.display = "none";
        }

        let upgHtml = document.getElementsByTagName("body")[0];
        allCssUpgradesBought.forEach((element) => {
            upgHtml.classList.remove(element);
        });

        rightOrNot.innerHTML = "";
        allCssUpgradesBought = [];
        boughtCssIncrementals = [];

        dollarUnlocked = true;

        setupCssUpgrades();
        setupLevelCssUpgrades();
        linesPerLineWritten();

        if (onOpen == false) {
            saveGame();
        }

        selgeSideBtn.style.display = "none";
    }
}

function reincarnation2() {
    if (cssLinesTotalTotal >= 10000) {
        const cssShopText = document.getElementById("shopCssText");
        const dollarShopText = document.getElementById("shopDollarText");
        const dollaridoosUnlockedHtml = document.getElementsByClassName("dollaridoos");

        selgeSide2();
        dollaridoos = 0;
        cssLinesTotalTotal = 0;
        totalMultiplier = 1;

        allDollaridoosUpgradesBought = [];

        for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
            dollaridoosUnlockedHtml[i].classList.remove("dollarUnlocked");
        }
        dollarShopText.style.display = "none";
        cssShopText.style.display = "none";

        if (localStorage.getItem("reincarnationPoints") == null) {
            localStorage.setItem("reincarnationPoints", 0);
            localStorage.setItem("reincarnationPointsTotal", 0);
        }
        localStorage.setItem("reincarnationPoints", parseInt(localStorage.getItem("reincarnationPoints")) + Math.floor(cssLinesTotalTotal / 10000));
        localStorage.setItem("reincarnationPointsTotal", parseInt(localStorage.getItem("reincarnationPointsTotal")) + Math.floor(cssLinesTotalTotal / 10000));

        saveGame();
        localStorage.setItem("dollarUnlocked", false)

        window.location.replace("reinkarnasjon.html");
    }
}

function linesPerLineWritten() {
    let linesPerLineWritten = document.getElementById("numberLines");
    let reincarnationPts = localStorage.getItem("reincarnationPointsTotal") == null ? 0 : parseInt(localStorage.getItem("reincarnationPointsTotal"));
    let reincarnationMultiplier = localStorage.getItem("totalReincarnationMultiplier") == null ? 0 : parseFloat(localStorage.getItem("totalReincarnationMultiplier"));
    let n = Math.floor((1 + totalPlus) * totalMultiplier * (1 + reincarnationPts / 10) * (1 + reincarnationMultiplier));
    linesPerLineWritten.innerHTML = "Antall linjer per linje skrevet: " + n;
}

// Function that checks if submitted CSS is right
function submitCss() {
    if (cssBox.value == currentText) {
        const rightOrNot = document.getElementById("rightOrNot");
        if (isGolden == true) {
            // If the line is golden, add 10 times lines instead of normal amount
            let reincarnationPts = localStorage.getItem("reincarnationPointsTotal") == null ? 0 : parseInt(localStorage.getItem("reincarnationPointsTotal"));
            let reincarnationMultiplier = localStorage.getItem("totalReincarnationMultiplier") == null ? 0 : parseFloat(localStorage.getItem("totalReincarnationMultiplier"));
            let n = Math.floor((1 + totalPlus) * totalMultiplier * 10 * (1 + reincarnationPts / 10) * (1 + reincarnationMultiplier));
            cssLines += n;
            cssLinesTotal += n;
            cssLinesTotalTotal += n;
        } else {
            // else add normal amount of lines
            let reincarnationPts = localStorage.getItem("reincarnationPointsTotal") == null ? 0 : parseInt(localStorage.getItem("reincarnationPointsTotal"));
            let reincarnationMultiplier = localStorage.getItem("totalReincarnationMultiplier") == null ? 0 : parseFloat(localStorage.getItem("totalReincarnationMultiplier"));
            let n = Math.floor((1 + totalPlus) * totalMultiplier * (1 + reincarnationPts / 10) * (1 + reincarnationMultiplier));
            cssLines += n;
            cssLinesTotal += n;
            cssLinesTotalTotal += n;
        }

        checkCssLines();

        rightOrNot.innerHTML = "Riktig! :)"; // Riktig! :)

        newCssText();
    } else {
        rightOrNot.innerHTML = "Feil. :("; // Feil. :(
    }
    cssBox.value = ""; // Clear the input box
}

// Function to generate new CSS text
function newCssText() {
    let chooseNum = Math.floor(Math.random() * numberPropertyTypes.length);
    let newCssTextContent;

    newCssTextContent = numberPropertyTypes[chooseNum];
    newCssTextContent = newCssTextContent[Math.floor(Math.random() * newCssTextContent.length)];

    if (isGolden == true) {
        stopGoldenLineInterval();
    }

    // Generate CSS text for the different types
    if (chooseNum == 0) {
        newCssTextContent = newCssTextContent + ": " + wordTypes[Math.floor(Math.random() * wordTypes.length)] + ";";
    } else if (chooseNum == 1) {
        let chNum1 = Math.floor(Math.random() * 100) + 1;
        newCssTextContent = newCssTextContent + ": " + chNum1 + numberTypes[Math.floor(Math.random() * numberTypes.length)] + ";";
    } else if (chooseNum == 2) {
        newCssTextContent = newCssTextContent + ": " + Math.floor(Math.random() * 10) / 10 + ";";
    }

    let goldenLine = Math.floor(Math.random() * 25);
    if (goldenLine == 1) {
        const cssText = document.getElementById("cssText");
        const timerHtml = document.getElementById("timer");

        let timer = 10;
        timerHtml.innerHTML = timer;
        cssText.style.backgroundColor = "gold";
        timerHtml.style.display = "block";
        isGolden = true;

        goldenLineInterval = setInterval(function () {
            timer -= 1;
            timerHtml.innerHTML = timer;
            if (timer == 0) {
                stopGoldenLineInterval();
            }
        }, 1000);
    }
    currentText = newCssTextContent;
    document.getElementById("cssText").innerHTML = newCssTextContent;
}

// Function to stop the golden line
function stopGoldenLineInterval() {
    const cssText = document.getElementById("cssText");
    const timerHtml = document.getElementById("timer");

    clearInterval(goldenLineInterval);
    cssText.style.backgroundColor = "";
    timerHtml.style.display = "none";
    isGolden = false;
}

// Event listener for Enter key press in the CSS input box
document.addEventListener("keypress", function (event) {
    const cssBox = document.getElementById("cssBox");
    let isFocused = document.activeElement === cssBox;
    if (event.key == "Enter" && isFocused) {
        submitCss();
    }
});

// Arrays with different CSS combinations
const numberTypes = ["px", "vh", "vw", "rem", "%"];

const wordTypes = ["center", "end", "top", "bottom", "left", "right"];

const numericValueProperties = ["animation-iteration-count", "flex", "flex-grow", "flex-shrink", "line-height", "opacity", "order"];

const keywordValueProperties = [
    "align-content",
    "align-items",
    "align-self",
    "direction",
    "justify-content",
    "list-style-position",
    "object-fit",
    "object-position",
    "text-align",
    "text-align-last",
    "text-justify",
];

const lengthValueProperties = [
    "border-bottom-width",
    "border-left-width",
    "border-right-width",
    "border-top-width",
    "column-gap",
    "column-rule-width",
    "column-width",
    "flex-basis",
    "font-size",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "outline-offset",
    "outline-width",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "text-indent",
    "width",
];

const numberPropertyTypes = [keywordValueProperties, lengthValueProperties, numericValueProperties];

fetchUpgrades().then(() => {
    setupLevelCssUpgrades();
    setupCssUpgrades();
    newCssText();
    onOpen();
    autoSave();
});