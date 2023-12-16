let numHtml = document.getElementById("number");
let dollaridoosHtml = document.getElementById("dollaridoos");
let cssLines = 0;
let cssLinesTotal = 0;
let dollaridoos = 0;
let cssBox = document.getElementById("cssBox");
let cssTextBox = document.getElementById("cssTextBox");
let cssText = document.getElementById("cssText");
let rightOrNot = document.getElementById("rightOrNot");
let upgradesBoughtBox = document.getElementById("upgradesBought");
let upgradesBoughtText = document.getElementById("upgradesBoughtText");
let upgradesBoughtItems = document.getElementsByClassName("upgradesBoughtItem");
let upgradesBoughtDollarItems = document.getElementsByClassName("upgradesBoughtDollarItem");
let allCssUpgradesBought = [];
let allDollaridoosUpgradesBought = [];
let shopDiv = document.getElementById("shopDiv");
let selgeSideBtn = document.getElementById("btnSelgeSide");
let cssShopText = document.getElementById("shopCssText");
let totalMultiplier = 1;
let totalPlus = 0;
let shopCssItems = document.getElementsByClassName("shopItem");
let shopDollarItems = document.getElementsByClassName("shopDollarItem");
let dollarShopDiv = document.getElementById("shopDollarDiv");
let dollarShopText = document.getElementById("shopDollarText");
let upgradesBoughtCssText = document.getElementById("upgradesBoughtCssText");
let upgradesBoughtDollarText = document.getElementById("upgradesBoughtDollarText");
let cssUpgradesBoughtBox = document.getElementById("cssUpgradesBoughtBox");
let dollaridoosUnlockedHtml = document.getElementsByClassName("dollaridoos");
let dollarUnlocked = false;
let timerHtml = document.getElementById("timer");
let isGolden = false; // lets isGolden to be false
let newCssTextContent;
var img;
var imageBase64;
var backgroundColor;
var font = "16px Times New Roman";
var textColor = "#000000";
let timer = 0;
let goldenLineInterval;
let autoInterval;
let totalAutoMultiplier = 1;
let html;
let shopCssDiv = document.getElementById("shopCssDiv");
let dollarUpgradesBoughtBox = document.getElementById("dollarUpgradesBoughtBox");
let boughtDollarIncrementals = [];
let boughtCssIncrementals = [];
let shopLevelCssDiv = document.getElementById("shopLevelCssDiv");
let shopLevelDollarDiv = document.getElementById("shopLevelDollarDiv");
let shopLevelDollarText = document.getElementById("shopLevelDollarText");
let upgrades

async function fetchUpgrades() {
    const response = await fetch("../upgrades.json")
    //const response = await fetch("../upgrades2.json")
    upgrades = await response.json()
}



function setupLevelCssUpgrades() {
    shopLevelCssDiv.innerHTML = "";
    for (let i = 0; i < Object.entries(upgrades.upgLevelCssUpgrades).length; i++) {
        let currentUpg = Object.entries(upgrades.upgLevelCssUpgrades)[i][1];

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
    shopLevelDollarDiv.innerHTML = "";
    for (let i = 0; i < Object.entries(upgrades.upgLevelDollarUpgrades).length; i++) {
        let currentUpg = Object.entries(upgrades.upgLevelDollarUpgrades)[i][1];

        addDollarUpgrade(currentUpg);
        if (i >= 3) {
            return;
        }
    }
}

function setupDollarUpgrades() {
    shopDollarDiv.innerHTML = "";

    let incremantals = 0;
    for (let i = 0; i < 3; i++) {
        let currentUpg = Object.entries(upgrades.dollarUpgrades)[i][1];
        console.log(currentUpg);
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

function buyCssUpg(upg) {
    if (cssLines >= upg.price) {
        cssLines -= upg.price;
        numHtml.innerHTML = cssLines + " linjer";

        let upgHtml = document.getElementsByTagName("body")[0];

        upgHtml.classList.add(upg.name);

        totalPlus += upg.amount;

        allCssUpgradesBought.push(upg.name);

        let isAllCSSBought = localStorage.getItem("allCssUpgradesBought") == null 

        if (isAllCSSBought || !localStorage.getItem("allCssUpgradesBought").includes(upg.name)) {
            localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
        }
        if (upg.isIncremental == true) {
            boughtCssIncrementals.push(upg.name);
        }

        document.getElementById(`${upg.name}Shop`).parentElement.remove();

        addUpgBought2(upg, cssUpgradesBoughtBox);
        addNextShopItem2(upgrades.cssUpgrades, shopCssDiv);
        linesPerLineWritten();
    }
}

function buyDollarUpg(upg) {
    if (dollaridoos >= upg.price) {
        dollaridoos -= upg.price;
        dollaridoosHtml.innerHTML = dollaridoos + "$";

        allDollaridoosUpgradesBought.push(upg.name);

        if (upg.type == "auto") {
            autoInterval = setInterval(function () {
                cssLines += 1 * totalAutoMultiplier;
                cssLinesTotal += 1 * totalAutoMultiplier;
                numHtml.innerHTML = cssLines + " linjer";
                if (cssLinesTotal >= 30) {
                    selgeSideBtn.style.display = "block";
                }
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

        document.getElementById(`${upg.name}Shop`).parentElement.remove();

        addUpgBought2(upg, dollarUpgradesBoughtBox);
        addNextShopItem2(upgrades.dollarUpgrades, shopDollarDiv);
        linesPerLineWritten();
    }
}

function addNextShopItem2(upgObjects, shopDiv) {
    let shouldReturn = false;

    boughtDollarIncrementals.forEach((element) => {
        if (allDollaridoosUpgradesBought[allDollaridoosUpgradesBought.length - 1] == element && shopDiv == shopDollarDiv) {
            let upg = upgrades.upgLevelDollarUpgrades[element.replace(/\d+/g, '')];

            upg.price *= upg.upgradeIncrement;
            upg.name = upg.name.replace(/\d+/g, '') + (parseInt(upg.name.match(/\d+/g)) + 1);           
            upg.title = upg.title.replace(/\d+/g, '') + (parseInt(upg.title.match(/\d+/g)) + 1);

            addDollarUpgrade(upg);
            shouldReturn = true;
            return;
        }
    });

    boughtCssIncrementals.forEach((element) => {
     if (allCssUpgradesBought[allCssUpgradesBought.length - 1] == element && shopDiv == shopCssDiv) {
            let upg = upgrades.upgLevelCssUpgrades[element.replace(/\d+/g, '')];

            upg.price *= upg.upgradeIncrement;
            upg.name = upg.name.replace(/\d+/g, '') + (parseInt(upg.name.match(/\d+/g)) + 1);
            upg.title = upg.title.replace(/\d+/g, '') + (parseInt(upg.title.match(/\d+/g)) + 1);
            
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
    if (upgrades.cssUpgrades[upg.name] != null) {
        html.querySelector(".tooltip").innerHTML += `Gir ${upgrades.cssUpgrades[upg.name].amount} ekstra linje(r) hver gang du skriver.`;
    }

    if (upg.isIncremental == true) {
        let nameToRemove = upg.name.replace(/\d+/g, '') + (parseInt(upg.name.match(/\d+/g)) - 1);
        if (document.getElementById(`${nameToRemove}UpgradesBought`) != null) {
            document.getElementById(`${nameToRemove}UpgradesBought`).remove();
            let upgHtml = document.getElementsByTagName("body")[0];
            upgHtml.classList.remove(nameToRemove);
        }
    }

    type.appendChild(html);

    if (allCssUpgradesBought.length <= 1 && allDollaridoosUpgradesBought.length <= 1) {
        upgradesBoughtBox.style.display = "block";
        upgradesBoughtText.style.display = "block";
    }
    if (allDollaridoosUpgradesBought.length >= 1 && allCssUpgradesBought.length >= 1) {
        upgradesBoughtCssText.style.display = "block";
        upgradesBoughtDollarText.style.display = "block";
        if (allCssUpgradesBought.includes("border") && allCssUpgradesBought.includes("grid")) {
            upgradesBoughtCssText.style.borderRight = "1px solid black";
            cssUpgradesBoughtBox.style.borderRight = "1px solid black";
        }
    }
}

function selgeSide2() {
    if (cssLines >= 50) {
        if (dollarUnlocked == false) {
            for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
                dollaridoosUnlockedHtml[i].classList.add("dollarUnlocked");
            }
            dollarShopText.style.display = "block";
            cssShopText.style.display = "block";
            setupDollarUpgrades();
        }
        dollaridoos += Math.floor(cssLinesTotal / 10);

        cssLines = 0;
        totalPlus = 0;
        cssLinesTotal = 0;
        numHtml.innerHTML = cssLines + " linjer";
        dollaridoosHtml.innerHTML = dollaridoos + "$";
        dollaridoosHtml.style.display = "block";
        shopLevelDollarText.style.display = "block";
        cssUpgradesBoughtBox.innerHTML = "";
        upgradesBoughtCssText.style.display = "none";
        upgradesBoughtCssText.style.borderRight = "none";
        cssUpgradesBoughtBox.style.borderRight = "none";



        if (allDollaridoosUpgradesBought.length <= 0) {
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
        setupLevelDollarUpgrades();
        linesPerLineWritten();

        selgeSideBtn.style.display = "none";
    }
}

function reincarnation2() {
    if (cssLinesTotal >= 10000) {
        selgeSide2();
        dollaridoos = 0;
        totalMultiplier = 1;

        allDollaridoosUpgradesBought = [];

        for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
            dollaridoosUnlockedHtml[i].classList.remove("dollarUnlocked");
        }
        dollarShopText.style.display = "none";
        cssShopText.style.display = "none";

        if (localStorage.getItem("reincarnationPoints") == null) {
            localStorage.setItem("reincarnationPoints", 0);
        }
        localStorage.setItem("reincarnationPoints", parseInt(localStorage.getItem("reincarnationPoints")) + Math.floor(cssLinesTotal / 10000));
        window.location.replace("reinkarnasjon.html");
    }
}

function onOpen() {
    if (localStorage.getItem("chosenUpg") != null) {
        buyCssUpg(upgrades.cssUpgrades[localStorage.getItem("chosenUpg")]);
    }
}

function linesPerLineWritten() {
    let linesPerLineWritten = document.getElementById("numberLines");
    linesPerLineWritten.innerHTML = "Antall linjer per linje skrevet: " + (1 + totalPlus) * totalMultiplier;
}

// Function that checks if submitted CSS is right
function submitCss() {
    if (cssBox.value == newCssTextContent) {
        if (isGolden == true) {
            // If the line is golden, add 10 lines instead of 1
            cssLines += (1 + totalPlus) * totalMultiplier * 10;
            cssLinesTotal += (1 + totalPlus) * totalMultiplier * 10;
        } else {
            // else add 1 line
            cssLines += (1 + totalPlus) * totalMultiplier;
            cssLinesTotal += (1 + totalPlus) * totalMultiplier;
        }

        if (cssLines == 1) {
            numHtml.innerHTML = cssLines + " linje";
        } else {
            numHtml.innerHTML = cssLines + " linjer";
        }

        if (cssLinesTotal >= 50) {
            selgeSideBtn.style.display = "block";
        }
        if (cssLinesTotal >= 10000) {
            reincarnationBtn.style.display = "block";
        }

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
                convertToImage(newCssTextContent, isGolden);
            }
        }, 1000);
    }
    convertToImage(newCssTextContent, isGolden);
}

// Function to stop the golden line
function stopGoldenLineInterval() {
    clearInterval(goldenLineInterval);
    cssText.style.backgroundColor = "";
    timerHtml.style.display = "none";
    isGolden = false;
}

// Function to convert the CSS text to an image
function convertToImage(newCssTextContent, isGolden) {
    cssText.innerHTML = "";
    if (isGolden == true) {
        backgroundColor = "gold";
    } else {
        backgroundColor = "rgba(0, 0, 0, 0)";
    }
    imageBase64 = textToImage(newCssTextContent, font, textColor, backgroundColor);
    img.src = imageBase64;
    cssText.appendChild(img);
}

// Function to convert text to image
function textToImage(text, font, textColor, backgroundColor) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;

    canvas.width = 207;
    canvas.height = 24;

    var pixelRatio = window.devicePixelRatio * 2;
    canvas.width *= 2;
    canvas.height *= 2;
    context.scale(pixelRatio, pixelRatio);

    context.font = font;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = textColor;
    context.fillText(text, 0, parseInt(font, 10));
    img = document.createElement("img");

    return canvas.toDataURL("image/png");
}

// Event listener for Enter key press in the CSS input box
document.addEventListener("keypress", function (event) {
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
    onOpen();
    newCssText();
})