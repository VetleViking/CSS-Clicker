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

// This is a test
let upgCssObjects = {};
let upgDollarObjects = {};
shopDiv;
let html;
let shopCssDiv = document.getElementById("shopCssDiv");
let dollarUpgradesBoughtBox = document.getElementById("dollarUpgradesBoughtBox");
cssUpgradesBoughtBox = document.getElementById("cssUpgradesBoughtBox");

upgCssObjects["testUpg"] = {
    name: "testUpg",
    title: "TestUpg",
    toolTip: "Dette er en tooltip.",
    price: 0,
    amount: 1,
};

unitTestCss();

function unitTestCss() {
    for (i = 0; i < 10; i++) {
        upgCssObjects["testUpg" + i] = {
            name: "testUpg" + i,
            title: "TestUpg" + i,
            toolTip: "Dette er en tooltip.",
            price: 0,
            amount: 1,
        };
    }
}

unitTestDollar();

function unitTestDollar() {
    for (i = 0; i < 10; i++) {
        upgDollarObjects["testDollarUpg" + i] = {
            name: "testDollarUpg" + i,
            title: "TestDollarUpg" + i,
            toolTip: "Dette er en tooltip.",
            type: "multiplier",
            price: 0,
            amount: 1,
        };
    }
}

setupCssUpgrades();

function setupCssUpgrades() {
    shopCssDiv.innerHTML = "";

    for (i = 0; i < 3; i++) {
        let currentUpg = Object.entries(upgCssObjects)[i][1];
        
        addCssUpgrade(currentUpg);
    }
}

function setupDollarUpgrades() {
    shopDollarDiv.innerHTML = "";

    for (i = 0; i < 3; i++) {
        let currentUpg = Object.entries(upgDollarObjects)[i][1];
        addDollarUpgrade(currentUpg);
    }
}

function addCssUpgrade(upg) {
    html = `
    <div class="shopItem infoBox" id="${upg.name}Shop" onclick="buyCssUpg('${upg.name}', ${upg.price}, ${upg.amount})">
        <p>
            ${upg.title}: ${upg.price} linjer <span class="tooltip"
                >${upg.toolTip}</br>Gir ${upg.amount} ekstra linje(r) hver gang du skriver.</span>
        </p>
    </div>`;

    shopCssDiv.appendChild(html);
    eventListener(upg.name);
}

function addDollarUpgrade(upg) {
    html = `
    <div class="shopDollarItem infoBox" id="${upg.name}Shop" onclick="buyDollarUpg('${upg.name}', ${upg.price}, ${upg.amount}, '${upg.type}')"
    >
        <p>
            ${upg.title}: ${upg.price}$<span class="tooltip">${upg.toolTip}<br />Legger til ${upg.amount} i multiplier til mengden linjer du får når du skriver</span>
        </p>
    </div>
    `;

    shopDollarDiv.appendChild(html);
    eventListener(upg.name);
}

function eventListener(upgName) {
    console.log(upgName);
    document.getElementById(`${upgName}Shop`).addEventListener("click", function () {
        console.log(upgName);
        buyCssUpg(upgName);
    });
}

function buyCssUpg(name, price, amount) {
    if (cssLines >= price) {
        cssLines -= price;
        numHtml.innerHTML = cssLines + " linjer";

        let upgHtml = document.getElementsByTagName("body")[0];

        upgHtml.classList.add(name);

        totalPlus += amount;

        allCssUpgradesBought.push(name);

        if (localStorage.getItem("allCssUpgradesBought") == null || localStorage.getItem("allCssUpgradesBought").includes(name) == false) {
            localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
        }

        document.getElementById(`${name}Shop`).innerHTML = "";

        addNextShopItem2(upgCssObjects, shopCssDiv);
        addUpgBought2(name, cssUpgradesBoughtBox);
        linesPerLineWritten();
    }
}

function buyDollarUpg(name, price, amount, type) {
    if (dollaridoos >= price) {
        dollaridoos -= price;
        dollaridoosHtml.innerHTML = dollaridoos + "$";

        allDollaridoosUpgradesBought.push(name);

        if (type == "auto") {
            autoInterval = setInterval(function () {
                cssLines += 1;
                cssLinesTotal += 1;
                numHtml.innerHTML = cssLines + " linjer";
                if (cssLinesTotal >= 30) {
                    selgeSideBtn.style.display = "block";
                }
            }, amount * 1000);
        }
        if (type == "multiplier") {
            totalMultiplier += amount;
        }

        document.getElementById(`${name}Shop`).innerHTML = "";

        addNextShopItem2(upgDollarObjects, shopDollarDiv);
        addUpgBought2(name, dollarUpgradesBoughtBox);
        linesPerLineWritten();
    }
}

function addNextShopItem2(upgObjects, shopDiv) {
    for (i = 0; i < Object.entries(upgObjects).length; i++) {
        let currentUpg = Object.entries(upgObjects)[i][1];
        if (!allCssUpgradesBought.includes(currentUpg.name) && document.getElementById(`${currentUpg.name}Shop`) == null) {
            if (shopDiv == shopCssDiv) {
                addCssUpgrade(currentUpg);
            } else if (shopDiv == shopDollarDiv) {
                addDollarUpgrade(currentUpg);
            }
            return;
        }
    }
}

function addUpgBought2(name, type) {
    // Continue here
    // maybe split this function into two functions, one for css and one for dollaridoos
    html = `
        <div class="upgradesBoughtItem" id="${name}UpgradesBought"><p>${name}</p></div>
    `;
    type.innerHTML += html;

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
    if (cssLines >= 0) {
        if (dollarUnlocked == false) {
            for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
                dollaridoosUnlockedHtml[i].classList.add("dollarUnlocked");
            }
            dollarShopText.style.display = "block";
            cssShopText.style.display = "block";
            setupDollarUpgrades();
        }
        dollaridoos += Math.floor(cssLines / 10);

        cssLines = 0;
        totalPlus = 0;
        cssLinesTotal = 0;
        numHtml.innerHTML = cssLines + " linjer";
        dollaridoosHtml.innerHTML = dollaridoos + "$";
        dollaridoosHtml.style.display = "block";

        let upgHtml = document.getElementsByTagName("body")[0];
        allCssUpgradesBought.forEach((element) => {
            upgHtml.classList.remove(element);
        });

        rightOrNot.innerHTML = "";
        allCssUpgradesBought = [];

        dollarUnlocked = true;

        setupCssUpgrades();
        linesPerLineWritten();
    }
}

function reincarnation2 () {    
    selgeSide2()
    dollaridoos = 0;
    totalMultiplier = 1;

    if (localStorage.getItem("reincarnationPoints") == null) {
        //bla bla fortsett her
    }
}

// Ideer:
// Reinkarnasjon senere

//start(shopCssItems);
start(shopDollarItems);
onOpen();

function onOpen() {
    if (localStorage.getItem("chosenUpg") != null) {
        kjøpeCss(localStorage.getItem("chosenUpg"), 0, 2);
    }
}

function start(items) {
    for (let i = 3; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

// Reincarnation function
function reincarnation() {
    if (cssLinesTotal >= 0) {
        if (localStorage.getItem("reincarnationPoints") == null) {
            localStorage.setItem("reincarnationPoints", 0);
        } else {
            reincarnationPoints = parseInt(localStorage.getItem("reincarnationPoints"));
            reincarnationPoints += Math.floor(cssLinesTotal / 10000);
            localStorage.setItem("reincarnationPoints", reincarnationPoints);
        }
        selgeSide();
        allDollaridoosUpgradesBought = [];
        totalMultiplier = 1;
        dollaridoos = 0;
        upgradesBoughtBox.style.display = "none";
        dollaridoosHtml.style.display = "none";
        dollarShopText.style.display = "none";
        dollarShopDiv.style.display = "none";
        cssShopText.style.display = "none";

        for (let i = 0; i < upgradesBoughtDollarItems.length; i++) {
            upgradesBoughtDollarItems[i].style.display = "none";
        }

        for (let i = 0; i <= 2; i++) {
            shopDollarItems[i].style.display = "initial";
        }

        clearInterval(autoInterval);
        start(shopDollarItems);

        for (let i = 0; i < allDollaridoosUpgradesBought.length; i++) {
            let currentDollarUpgrade = allDollaridoosUpgradesBought[i];
            let shopItemIds = document.getElementById(currentDollarUpgrade + "DollarShop");
            shopItemIds.style.display = "block";
        }
        window.location.replace("reinkarnasjon.html");
    }
}

// Function to sell the website
function selgeSide() {
    if (cssLinesTotal >= 0) {
        if (dollarUnlocked == false) {
            for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
                dollaridoosUnlockedHtml[i].classList.add("dollarUnlocked");
            }
        }
        dollaridoos += Math.floor(cssLinesTotal / 10);

        cssLines = 0;
        totalPlus = 0;
        cssLinesTotal = 0;
        numHtml.innerHTML = cssLines + " linjer";
        dollaridoosHtml.innerHTML = dollaridoos + "$";
        dollaridoosHtml.style.display = "block";

        for (let i = 0; i < allCssUpgradesBought.length; i++) {
            let currentCssUpgrade = allCssUpgradesBought[i];
            let classes = document.getElementsByClassName(currentCssUpgrade + "Bought");
            let shopItemIds = document.getElementById(currentCssUpgrade + "Shop");
            shopItemIds.style.display = "block";

            for (let i = 0; i < classes.length; i++) {
                if (classes[i].classList.contains(currentCssUpgrade + "Bought")) {
                    classes[i].classList.remove(currentCssUpgrade + "On", currentCssUpgrade + "Bought");
                }
            }
        }

        for (let i = 0; i < upgradesBoughtItems.length; i++) {
            upgradesBoughtItems[i].style.display = "none";
        }

        dollarShopText.style.display = "block";
        cssShopText.style.display = "block";
        dollarShopDiv.style.display = "block";

        rightOrNot.innerHTML = "";
        allCssUpgradesBought = [];

        if (allDollaridoosUpgradesBought.length == 0) {
            upgradesBoughtText.style.display = "none";
        }

        upgradesBoughtDollarText.style.display = "none";
        upgradesBoughtCssText.style.display = "none";
        upgradesBoughtCssText.style.borderRight = "none";
        cssUpgradesBoughtBox.style.borderRight = "none";

        //selgeSideBtn.style.display = "none";

        start(shopCssItems);
        if (dollarUnlocked == false) {
            start(shopDollarItems);
        } else {
        }

        linesPerLineWritten();
        dollarUnlocked = true;
    }
}

// Function to buy CSS
function kjøpeCss(clas, price, amount) {
    if (cssLines >= price && !allCssUpgradesBought.includes(clas)) {
        cssLines -= price;
        numHtml.innerHTML = cssLines + " linjer";

        let classBuyList = document.getElementsByClassName(clas);
        let buyCssShopItem = document.getElementById(clas + "Shop");

        for (let i = 0; i < classBuyList.length; i++) {
            if (classBuyList[i].classList.contains(clas + "Bought")) {
            } else {
                classBuyList[i].classList.add(clas + "On", clas + "Bought");
            }
        }

        totalPlus += amount;

        allCssUpgradesBought.push(clas);

        if (localStorage.getItem("allCssUpgradesBought") == null || localStorage.getItem("allCssUpgradesBought").includes(clas) == false) {
            localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
        }

        buyCssShopItem.style.display = "none";

        addNextShopItem(shopCssItems);
        addUpgBought(clas);
        linesPerLineWritten();
    }
}

// Function to buy stuff with dollaridoos
function kjøpeDollar(type, clas, amount, price) {
    if (dollaridoos >= price && !allDollaridoosUpgradesBought.includes(clas)) {
        dollaridoos -= price;
        dollaridoosHtml.innerHTML = dollaridoos + "$";

        let buyDollarShopItem = document.getElementById(clas + "DollarShop");

        if (type == "multiplier") {
            totalMultiplier *= amount;
            dollaridoosHtml.innerHTML = dollaridoos + "$";
        } else if (type == "auto") {
            autoInterval = setInterval(function () {
                cssLines += 1;
                cssLinesTotal += 1;
                numHtml.innerHTML = cssLines + " linjer";
                if (cssLinesTotal >= 30) {
                    selgeSideBtn.style.display = "block";
                }
            }, amount * 1000);
        }

        if (allDollaridoosUpgradesBought.length == 0) {
            upgradesBoughtBox.style.display = "block";
        }

        allDollaridoosUpgradesBought.push(clas);
        buyDollarShopItem.style.display = "none";

        addNextShopItem(shopDollarItems);
        addUpgBought(clas);
        linesPerLineWritten();
    }
}

// Function to add new shop items

function addNextShopItem(shopType) {
    let upgradesBought = [];
    if (shopType == shopCssItems) {
        upgradesBought = allCssUpgradesBought;
    } else if (shopType == shopDollarItems) {
        upgradesBought = allDollaridoosUpgradesBought;
    }

    if (shopType[upgradesBought.length + 2] != undefined) {
        shopType[upgradesBought.length + 2].style.display = "block";
    }
}

// Function to add bought upgrades to the upgrades bought box

function addUpgBought(clas) {
    let buyUpgradesBoughtItem = document.getElementById(clas + "UpgradesBought");

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
    buyUpgradesBoughtItem.style.display = "block";
}

// Function to enable/disable CSS on specified class
function toggleCss(clas) {
    let classToggleList = document.getElementsByClassName(clas);
    for (let i = 0; i < classToggleList.length; i++) {
        if (classToggleList[i].classList.contains(clas + "On", clas + "Bought")) {
            classToggleList[i].classList.remove(clas + "On");
        } else if (classToggleList[i].classList.contains(clas + "Bought")) {
            classToggleList[i].classList.add(clas + "On");
        }
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

        if (cssLinesTotal >= 100) {
            selgeSideBtn.style.display = "block";
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

    let goldenLine = Math.floor(Math.random() * 2);
    if (goldenLine == 1) {
        let timer = 100;
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

newCssText();
