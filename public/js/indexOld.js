start(shopCssItems);
start(shopDollarItems);

function start(items) {
    for (let i = 3; i < items.length; i++) {
        items[i].style.display = "none";
    }
}


// Function to convert the CSS text to an image
function convertToImage(newCssTextContent, isGolden) {
    const cssText = document.getElementById("cssText");
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


// har denne på lur i tilfelle
buyAllCssUpgrades();

function buyAllCssUpgrades() {
    addNextShopItem2(upgrades.cssUpgrades, shopCssDiv);
    for (let i = 0; i < 6; i++) {
        console.log(i);
        let currentUpg = Object.entries(upgrades.cssUpgrades)[i][1];
        
        buyCssUpg(currentUpg);
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