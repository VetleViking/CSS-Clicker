let numHtml = document.getElementById("number");
let dollaridoosHtml = document.getElementById("dollaridoos");
let cssLines = 0;
let cssLinesTotal = 0;
let dollaridoos = 0;
let cssBox = document.getElementById("cssBox");
let cssText = document.getElementById("cssText");
let rightOrNot = document.getElementById("rightOrNot");
let upgradesBoughtBox = document.getElementById("upgradesBought");
let upgradesBoughtText = document.getElementById("upgradesBoughtText");
let upgradesBoughtItems = document.getElementsByClassName("upgradesBoughtItem");
let allCssUpgradesBought = [];
let allDollaridoosUpgradesBought = [];
let shopDiv = document.getElementById("shopDiv");
let selgeSideBtn = document.getElementById("btnSelgeSide");
let cssShopText = document.getElementById("shopCssText");
let totalMultiplier = 1;
let totalPlus = 0;
let shopCssItems = document.getElementsByClassName("shopItem");
let shopDollarItems = document.getElementsByClassName("shopDollarItem");
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
var text;
var backgroundColor;
var font = "16px Times New Roman";
var textColor = "#000000";
let timer = 0;
let goldenLineInterval;

// Ideer:
// Reinkarnasjon senere

start(shopCssItems);
start(shopDollarItems);

function start(items) {
    for (let i = 3; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

// Function to sell the website
function selgeSide() {
    if (cssLinesTotal >= 100) {
        if (dollarUnlocked == false) {
            for (let i = 0; i < dollaridoosUnlockedHtml.length; i++) {
                dollaridoosUnlockedHtml[i].classList.add("dollarUnlocked");
            }
        }
        dollaridoos += Math.floor(cssLinesTotal / 10);

        cssLines = 0;
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

        let dollarShopDiv = document.getElementById("shopDollarDiv");
        let dollarShopText = document.getElementById("shopDollarText");
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

        selgeSideBtn.style.display = "none";

        dollarUnlocked = true;

        start(shopCssItems);
        if (dollarUnlocked == false) {
            start(shopDollarItems);
        } else {
        }
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

        buyCssShopItem.style.display = "none";

        addNextShopItem(shopCssItems);
        addUpgBought(clas);
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
            setInterval(function () {
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

// Function that checks if submitted CSS is right
function submitCss() {
    if (cssBox.value == newCssTextContent) {
        if (isGolden == true) {
            // If the line is golden, add 10 lines instead of 1
            cssLines += (10 + totalPlus) * totalMultiplier;
            cssLinesTotal += (10 + totalPlus) * totalMultiplier;
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
        backgroundColor = "#ffffff";
    }

    imageBase64 = textToImage(newCssTextContent, font, textColor, backgroundColor);
    img.src = imageBase64;
    cssText.appendChild(img);
}

// Function to convert text to image
function textToImage(text, font, textColor, backgroundColor) {

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var textWidth = context.measureText(text).width;

    canvas.width = textWidth;
    canvas.height = parseInt(font, 14); 

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
