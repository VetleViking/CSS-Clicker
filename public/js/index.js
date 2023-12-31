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

async function fetchUpgrades() {
    //const response = await fetch("../upgrades.json");
    const response = await fetch("../upgrades2.json");
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
        selgeSide(true);
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

    if (localStorage.getItem("borderRadiusValue") != null && document.getElementById("borderRadiusSlider") != null) {
        let borderRadius = document.getElementById("borderRadiusSlider");
        borderRadius.value = localStorage.getItem("borderRadiusValue");

        let allBorderRadius = ["cssTyper", "shop", "upgradesBought", "selgeSide", "reinkarnasjon"];
        allBorderRadius.forEach((element) => {
            let currentElement = document.getElementById(element);
            currentElement.style.borderRadius = localStorage.getItem("borderRadiusValue") + "px";
        });
    }

    document.getElementById("settings").addEventListener("click", () => {
        settings();
    });
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
            ${upg.title}: ${Math.ceil(upg.price)} linjer <span class="tooltip"
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

    if (isAllCSSBought || !localStorage.getItem("allCssUpgradesBought").includes(upg.name)) {
        localStorage.setItem("allCssUpgradesBought", allCssUpgradesBought);
    }
    if (upg.isIncremental == true) {
        boughtCssIncrementals.push(upg.name);
    }

    let shopItem = document.getElementById(`${upg.name}Shop`);
    if (shopItem != null) {
        shopItem.parentElement.remove();
    }

    addUpgBought(upg, cssUpgradesBoughtBox);
    addNextShopItem(upgrades.cssUpgrades, shopCssDiv);
    linesPerLineWritten();
    if (!alreadyBought) {
        saveGame();
    }
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

    addUpgBought(upg, dollarUpgradesBoughtBox);
    addNextShopItem(upgrades.dollarUpgrades, shopDollarDiv);
    linesPerLineWritten();
    if (!alreadyBought) {
        saveGame();
    }
}

function checkCssLines() {
    const numHtml = document.getElementById("number");
    if (cssLines == 1) {
        numHtml.innerHTML = cssLines + " linje";
    } else {
        numHtml.innerHTML = cssLines + " linjer";
    }

    if (cssLinesTotal >= 30) {
        const selgeSideBtn = document.getElementById("selgeSide");

        selgeSideBtn.style.display = "block";
    }
    if (cssLinesTotalTotal >= 10000) {
        const reincarnationBtn = document.getElementById("reinkarnasjon");

        reincarnationBtn.style.display = "block";
    }
}

function addNextShopItem(upgObjects, shopDiv) {
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

function addUpgBought(upg, type) {
    let html = document.createElement("div");
    let borderRadiusValue = upg.name.match(/\d+/g);

    html.innerHTML = `
        <div class="upgradesBoughtItem infoBox"><p>${upg.title}<span class="tooltip">${upg.toolTip}<br /></span></p></div>
    `;

    html.id = `${upg.name}UpgradesBought`;

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
        if (upg.name.replace(/\d+/g, "") == "border-radius") {
            let html2 = `
                <div class="slidecontainer">
                    <input type="range" min="0" max="${upg.name.match(/\d+/g)}" value="${upg.name.match(/\d+/g)}" class="slider" id="borderRadiusSlider">
                </div>
            `;

            html.innerHTML += html2;
            let allBorderRadius = ["cssTyper", "shop", "upgradesBought", "selgeSide", "reinkarnasjon"];
            allBorderRadius.forEach((element) => {
                let currentElement = document.getElementById(element);
                let borderRadius = upg.name.match(/\d+/g);
                currentElement.style.borderRadius = borderRadius + "px";
            });

            if (document.getElementById("borderRadiusSlider") != null) {
                let borderRadius = document.getElementById("borderRadiusSlider");

                borderRadiusValue = borderRadius.value;
            }
        }

        let nameToRemove = upg.name.replace(/\d+/g, "") + (parseInt(upg.name.match(/\d+/g)) - 1);
        if (document.getElementById(`${nameToRemove}UpgradesBought`) != null) {
            document.getElementById(`${nameToRemove}UpgradesBought`).remove();
            let upgHtml = document.getElementsByTagName("body")[0];
            upgHtml.classList.remove(nameToRemove);
        }
    }

    type.appendChild(html);

    if (upg.name.replace(/\d+/g, "") == "border-radius") {
        borderRadius(borderRadiusValue);
    }

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

function borderRadius() {
    const borderRadiusSlider = document.getElementById("borderRadiusSlider");

    borderRadiusSlider.oninput = function () {
        let allBorderRadius = ["cssTyper", "shop", "upgradesBought", "selgeSide", "reinkarnasjon"];
        localStorage.setItem("borderRadiusValue", this.value);
        allBorderRadius.forEach((element) => {
            let currentElement = document.getElementById(element);
            let borderRadius = this.value;
            currentElement.style.borderRadius = borderRadius + "px";
        });
    };
}

function settings() {
    settingsItems = ["Reset spillet"];
    chosenUpg = "";

    let html = `
    <div class="settingsDiv">
        <div class="settingsWindow">
            <div class="settingsTitlebar">
                <p class="settingsTitle">settings</p>
                <div class="settingsClose"><p>&times;</p></div>
            </div>
            <div class="settingsContent"></div>
            <div class="settingsButtons">
                <div class="settingsButton settingsButtonYe"><p>Ok</p></div>
                <div class="settingsButton settingsButtonNo"><p>Avbryt</p></div>
            </div>
        </div>
    </div>`;

    settingsItems.forEach((element) => {
        let indexPos = html.search(`<div class="settingsContent">`);
        html = html.substring(0, indexPos + 29) + `<div class="${element}" id="${element}setting">${element}</div>` + html.substring(indexPos + 29, html.length);
    });

    let template = document.createElement("template");
    template.innerHTML = html;

    document.body.appendChild(template.content);

    const confirmEl = document.querySelector(".settingsDiv");
    const btnClose = document.querySelector(".settingsClose");
    const btnOk = document.querySelector(".settingsButtonYe");
    const btnCancel = document.querySelector(".settingsButtonNo");

    confirmEl.addEventListener("click", (e) => {
        if (e.target === confirmEl) {
            close(confirmEl);
        }
    });

    btnOk.addEventListener("click", () => {
        if (chosenUpg == "Reset spillet") {
            localStorage.clear();
            location.reload();
        }
        close(confirmEl);
    });

    [btnCancel, btnClose].forEach((el) => {
        el.addEventListener("click", () => {
            close(confirmEl);
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.id.includes("setting")) { 
            settingsItems.forEach((element) => {
                if (e.target.id.includes(element)) {
                    document.getElementById(element + "setting").style.backgroundColor = "gray";
                    chosenUpg = element;
                    console.log(chosenUpg == "Reset spillet");
                } else {
                    document.getElementById(element + "setting").style.backgroundColor = "white";
                }
            });
        }
    });

    function close(confirmEl) {
        confirmEl.classList.add("confirm--close");
        document.body.removeChild(confirmEl);
    }
}

function selgeSide(onOpen = false) {
    if (cssLines >= 0 || onOpen == true) {
        const dollaridoosHtml = document.getElementById("dollaridoos");
        const rightOrNot = document.getElementById("rightOrNot");
        const selgeSideBtn = document.getElementById("selgeSide");
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
            let allBorderRadius = ["cssTyper", "shop", "upgradesBought", "selgeSide", "reinkarnasjon"];
            allBorderRadius.forEach((element) => {
                let currentElement = document.getElementById(element);
                currentElement.style.borderRadius = "0px";
            });

            saveGame();
        }

        //selgeSideBtn.style.display = "none";
    }
}

function reincarnation() {
    if (cssLinesTotalTotal >= 0) {
        const cssShopText = document.getElementById("shopCssText");
        const dollarShopText = document.getElementById("shopDollarText");
        const dollaridoosUnlockedHtml = document.getElementsByClassName("dollaridoos");

        selgeSide();
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
            localStorage.setItem("reincarnationPointsTotal", 0);
        }
        localStorage.setItem("reincarnationPoints", parseInt(localStorage.getItem("reincarnationPoints")) + Math.floor(cssLinesTotalTotal / 10000));
        localStorage.setItem("reincarnationPointsTotal", parseInt(localStorage.getItem("reincarnationPointsTotal")) + Math.floor(cssLinesTotalTotal / 10000));
        cssLinesTotalTotal = 0;

        localStorage.setItem("dollarUnlocked", false);

        saveGame();
        console.log("reincarnation");
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
