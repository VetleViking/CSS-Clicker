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
let upgCssObjects = {};
let upgDollarObjects = {};
let html;
let shopCssDiv = document.getElementById("shopCssDiv");
let dollarUpgradesBoughtBox = document.getElementById("dollarUpgradesBoughtBox");
let boughtIncrementals = [];


//notFinished();
function notFinished() {
    //css upgrades
    upgCssObjects["font-size"] = {
        name: "font-size",
        title: "Font-size",
        toolTip: "Legger til font-size til titler og sånt.",
        price: 0,
        amount: 1,
    };

    upgCssObjects["margin"] = {
        name: "margin",
        title: "Margin",
        toolTip: "Legger til margin så ting får pusterom.",
        price: 0,
        amount: 1,
    };

    upgCssObjects["padding"] = {
        name: "padding",
        title: "Padding",
        toolTip: "Legger til padding så tekst og sånt ikke blir så skvist.",
        price: 0,
        amount: 1,
    };

    upgCssObjects["color"] = {
        name: "color",
        title: "Farger",
        toolTip: "Adder noen basic farger til knapper og bokser og sånne greier.",
        price: 0,
        amount: 2,
    };

    upgCssObjects["border"] = {
        name: "border",
        title: "Border",
        toolTip: "Adder bordere til elementene så det er tydeligere skiller på ting.",
        price: 0,
        amount: 5,
    };

    upgCssObjects["grid"] = {
        name: "grid",
        title: "Grid",
        toolTip: "Adder et grid-system.",
        price: 0,
        amount: 10,
    };

    //dollar upgrades
    upgDollarObjects["mouse"] = {
        name: "mouse",
        title: "RGB mus",
        toolTip: "Med en fancy RGB mus kan du skrive css enda fortere! (det gir mening trust)",
        type: "multiplier",
        price: 0,
        amount: 1,
    };

    upgDollarObjects["stackoverflow"] = {
        name: "stackoverflow",
        title: "Stack Overflow",
        toolTip: "Spør de kule karene på Stack Overflow om hjelp med CSSen din! Bare vær klar over at de mobber deg for å stille spørsmål mer enn de faktisk hjelper.",
        type: "auto",
        price: 0,
        amount: 10,
    };

    upgDollarObjects["bedrePc"] = {
        name: "bedrePc1",
        title: "Bedre PC 1",
        toolTip: "Med en bedre PC kan du compile CSSen enda bedre.",
        type: "autoMultiplier",
        price: 0,
        amount: 2,
        isIncremental: true,
        upgradeIncrement: 5,
    };

    upgDollarObjects["w3schools"] = {
        name: "w3schools",
        title: "W3Schools",
        toolTip: "Lær CSS på W3Schools! Bare husk på at du blir sett ned på av \"ekte\" programmerere for å bruke W3Schools.",
        type: "multiplier",
        price: 0,
        amount: 2,

    };

    upgDollarObjects["keyboard"] = {
        name: "keyboard",
        title: "RGB keyboard",
        toolTip: "Med et fancy RGB keyboard suser linjene forbi!",
        type: "multiplier",
        price: 0,
        amount: 1,
    };

    upgDollarObjects["youtube"] = {
        name: "youtube",
        title: "YouTube",
        toolTip: "Lær CSS av indere på YouTube! Halvparten av tutorialsa er på indisk og resten er nesten uforståelige, men det funker, og da går det bra.",
        type: "auto",
        price: 0,
        amount: 5,
    };

    upgDollarObjects["chatGpt"] = {
        name: "chatGpt",
        title: "Chat GPT",
        toolTip: "La ChatGPT skrive CSSen for deg, mens du sitter og chiller!",
        type: "auto",
        price: 0,
        amount: 1,
    };

    upgDollarObjects["screen"] = {
        name: "screen",
        title: "4k 240hz skjerm",
        toolTip: "Med denne skjermen kan du se all CSSen utrolig bra!",
        type: "multiplier",
        price: 0,
        amount: 3,
    };
}
finished();
function finished() {
    //css upgrades
    upgCssObjects["font-size"] = {
        name: "font-size",
        title: "Font-size",
        toolTip: "Legger til font-size til titler og sånt.",
        price: 3,
        amount: 1,
    };

    upgCssObjects["margin"] = {
        name: "margin",
        title: "Margin",
        toolTip: "Legger til margin så ting får pusterom.",
        price: 10,
        amount: 1,
    };

    upgCssObjects["padding"] = {
        name: "padding",
        title: "Padding",
        toolTip: "Legger til padding så tekst og sånt ikke blir så skvist.",
        price: 25,
        amount: 1,
    };

    upgCssObjects["color"] = {
        name: "color",
        title: "Farger",
        toolTip: "Adder noen basic farger til knapper og bokser og sånne greier.",
        price: 50,
        amount: 2,
    };

    upgCssObjects["border"] = {
        name: "border",
        title: "Border",
        toolTip: "Adder bordere til elementene så det er tydeligere skiller på ting.",
        price: 100,
        amount: 5,
    };

    upgCssObjects["grid"] = {
        name: "grid",
        title: "Grid",
        toolTip: "Adder et grid-system.",
        price: 200,
        amount: 10,
    };

    //dollar upgrades
    upgDollarObjects["mouse"] = {
        name: "mouse",
        title: "RGB mus",
        toolTip: "Med en fancy RGB mus kan du skrive css enda fortere! (det gir mening trust)",
        type: "multiplier",
        price: 5,
        amount: 1,
    };

    upgDollarObjects["stackoverflow"] = {
        name: "stackoverflow",
        title: "Stack Overflow",
        toolTip: "Spør de kule karene på Stack Overflow om hjelp med CSSen din! Bare vær klar over at de mobber deg for å stille spørsmål mer enn de faktisk hjelper.",
        type: "auto",
        price: 10,
        amount: 10,
    };

    upgDollarObjects["bedrePc"] = {
        name: "bedrePc1",
        title: "Bedre PC 1",
        toolTip: "Med en bedre PC kan du compile CSSen enda bedre.",
        type: "autoMultiplier",
        price: 10,
        amount: 2,
        isIncremental: true,
        upgradeIncrement: 5,
    };

    upgDollarObjects["w3schools"] = {
        name: "w3schools",
        title: "W3Schools",
        toolTip: "Lær CSS på W3Schools! Bare husk på at du blir sett ned på av \"ekte\" programmerere for å bruke W3Schools.",
        type: "multiplier",
        price: 20,
        amount: 2,

    };

    upgDollarObjects["keyboard"] = {
        name: "keyboard",
        title: "RGB keyboard",
        toolTip: "Med et fancy RGB keyboard suser linjene forbi!",
        type: "multiplier",
        price: 70,
        amount: 1,
    };

    upgDollarObjects["youtube"] = {
        name: "youtube",
        title: "YouTube",
        toolTip: "Lær CSS av indere på YouTube! Halvparten av tutorialsa er på indisk og resten er nesten uforståelige, men det funker, og da går det bra.",
        type: "auto",
        price: 100,
        amount: 5,
    };

    upgDollarObjects["chatGpt"] = {
        name: "chatGpt",
        title: "Chat GPT",
        toolTip: "La ChatGPT skrive CSSen for deg, mens du sitter og chiller!",
        type: "auto",
        price: 150,
        amount: 1,
    };

    upgDollarObjects["screen"] = {
        name: "screen",
        title: "4k 240hz skjerm",
        toolTip: "Med denne skjermen kan du se all CSSen utrolig bra!",
        type: "multiplier",
        price: 200,
        amount: 3,
    };
}

//unitTestCss();

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

//unitTestDollar();

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
    let html = document.createElement("div");

    html.innerHTML = `
    <div class="shopItem infoBox" id="${upg.name}Shop">
        <p>
            ${upg.title}: ${upg.price} linjer <span class="tooltip"
                >${upg.toolTip}</br>Gir ${upg.amount} ekstra linje(r) hver gang du skriver.</span>
        </p>
    </div>`;

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
    shopDollarDiv.appendChild(html);
    eventListener(upg);
}

function eventListener(upg) {
    document.getElementById(`${upg.name}Shop`).addEventListener("click", function () {
        if (document.getElementById(`${upg.name}Shop`).classList.contains("shopDollarItem")) {
            console.log(upg.name + " event listener");
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

        if (localStorage.getItem("allCssUpgradesBought") == null || localStorage.getItem("allCssUpgradesBought").includes(upg.name) == false) {
            localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
        }

        document.getElementById(`${upg.name}Shop`).innerHTML = "";

        addNextShopItem2(upgCssObjects, shopCssDiv);
        addUpgBought2(upg, cssUpgradesBoughtBox);
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
            boughtIncrementals.push(upg.name);
        }

        document.getElementById(`${upg.name}Shop`).innerHTML = "";

        addUpgBought2(upg, dollarUpgradesBoughtBox);
        addNextShopItem2(upgDollarObjects, shopDollarDiv);
        linesPerLineWritten();
    }
}

function addNextShopItem2(upgObjects, shopDiv) {
    let shouldReturn = false;
    boughtIncrementals.forEach((element) => {
        if ((allDollaridoosUpgradesBought[allDollaridoosUpgradesBought.length -1] == element) && (shopDiv == shopDollarDiv)) {
            let upg = upgDollarObjects[element.substring(0, element.length - 1)];
            upg.price *= upg.upgradeIncrement;
            upg.name = upg.name.substring(0, upg.name.length - 1) + (parseInt(upg.name.substring(upg.name.length - 1)) + 1);
            upg.title = upg.title.substring(0, upg.title.length - 1) + (parseInt(upg.title.substring(upg.title.length - 1)) + 1);
            addDollarUpgrade(upg);
            shouldReturn = true;
            return;
        }
    });
    if (shouldReturn) {
        return;
    }
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
    if (cssLines >= 0) {
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

        dollarUnlocked = true;

        setupCssUpgrades();
        linesPerLineWritten();

        selgeSideBtn.style.display = "none";
    }
}

function reincarnation2 () {
    if (cssLinesTotal >= 10000) {
        selgeSide2()
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

onOpen();

function onOpen() {
    if (localStorage.getItem("chosenUpg") != null) {
        buyCssUpg(upgCssObjects[localStorage.getItem("chosenUpg")]);
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

newCssText();
