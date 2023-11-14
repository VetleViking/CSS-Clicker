let numHtml = document.getElementById("number"); 
let dollaridoosHtml = document.getElementById("dollaridoos"); 
let cssLines = 0; 
let cssLinesTotal = 0;
let dollaridoos = 0;
let cssBox = document.getElementById('cssBox');
let cssText = document.getElementById("cssText"); 
let rightOrNot = document.getElementById('rightOrNot'); 
let toggleText = document.getElementById('toggleText');
let allUpgradesBought = [];
let shopDiv = document.getElementById("shopDiv");

// Ideer
// Kjøpe oppgraderinger for å få mer linjer
// Kjøpe ting som stack overflow, w3schools, chatgpt osv for å få linjer automatisk
// Reinkarnasjon senere

// Function to sell the website
function selgeSide() {
    if (cssLinesTotal >= 0) {

        if (dollaridoos == 0) {
            shopDiv.classList.add("dollarUnlocked");
        }
        dollaridoos = Math.floor(cssLinesTotal / 10);

        cssLines = 0;
        cssLinesTotal = 0;
        numHtml.innerHTML = cssLines + " linjer";
        dollaridoosHtml.innerHTML = dollaridoos + "$";
        dollaridoosHtml.style.display = "initial";
        
        for (let i = 0; i < allUpgradesBought.length; i++) {
            let classes = document.getElementsByClassName(allUpgradesBought[i]); 
            let shopItemIds = document.getElementById(allUpgradesBought[i] + "Shop");
            shopItemIds.style.display = "initial";

            for (let i = 0; i < classes.length; i++) {
                if (classes[i].classList.contains("bought")) {
                    classes[i].classList.remove("on", "bought"); 
                }
            }
        }
        toggleItems = document.getElementsByClassName("toggleItem");
        for (let i = 0; i < toggleItems.length; i++) {     
            toggleItems[i].style.display = "none";  
        }

        toggleDollarShopText = document.getElementById("shopDollarText");
        toggleDollarShopText.style.display = "initial";
        toggleDollarShopItems = document.getElementById("shopDollarDiv");
        toggleDollarShopItems.style.display = "initial";

        toggleText.style.display = "none";
        rightOrNot.innerHTML = "";
        allUpgradesBought = [];
    }
}

// Function to buy CSS
function kjøpeCss(clas, price) {
    let classBuyList = document.getElementsByClassName(clas); 
    let classBoughtItem = document.getElementById(clas + "Bought");
    let classShopItem = document.getElementById(clas + "Shop");
    if (cssLines >= price && !allUpgradesBought.includes(clas)) {
        cssLines -= price;
        allUpgradesBought.push(clas);
        for (let i = 0; i < classBuyList.length; i++) {
            if (classBuyList[i].classList.contains("bought")) {} 
            else {
                classBuyList[i].classList.add("on", "bought"); 
            }
        }
        classShopItem.style.display = "none";
        classBoughtItem.style.display = "initial";
        toggleText.style.display = "initial";
        numHtml.innerHTML = cssLines + " linjer"; 
    }
}


// Function to enable/disable CSS on specified class
function toggleCss(clas) {
    let classToggleList = document.getElementsByClassName(clas); 
    for (let i = 0; i < classToggleList.length; i++) {
        if (classToggleList[i].classList.contains("on", "bought")) {
            classToggleList[i].classList.remove("on"); 
        } else if (classToggleList[i].classList.contains("bought")) {
            classToggleList[i].classList.add("on"); 
        }
    }
}

// Function that checksd if submitted CSS is right
function submitCss() {
    if (cssBox.value == cssText.innerHTML) { 
        cssLines += 1;
        cssLinesTotal += 1;
        numHtml.innerHTML = cssLines + " linjer"; 
        rightOrNot.innerHTML = "Riktig! :D"; 
        newCssTextBox();
    } else {
        rightOrNot.innerHTML = "Feil. :("; 
    }
    cssBox.value = ""; // Clear the input box
}

// Function to generate new CSS text
function newCssTextBox() {
    let chooseNum = Math.floor(Math.random() * numberPropertyTypes.length);
    let newCssText = numberPropertyTypes[chooseNum]; 
    newCssText = newCssText[Math.floor(Math.random() * newCssText.length)]; 

    // Generate CSS text for the different types
    if (chooseNum == 0) {
        newCssText = newCssText + ": " + wordTypes[Math.floor(Math.random() * wordTypes.length)] + ";"; 
    } else if (chooseNum == 1) {
        let chNum1 = Math.floor(Math.random() * 100) + 1;
        newCssText = newCssText + ": " + chNum1 + numberTypes[Math.floor(Math.random() * numberTypes.length)] + ";"; 
    } else if (chooseNum == 2) {
        newCssText = newCssText + ": " + Math.floor(Math.random() * 10) / 10 + ";"; 
    }
    cssText.innerHTML = newCssText; // Display the generated CSS text
}

// Event listener for Enter key press in the CSS input box
document.addEventListener("keypress", function(event) {
    let isFocused = (document.activeElement === cssBox);
    if (event.key == "Enter" && isFocused) {
        submitCss(); 
    }
});

// Arrays with different CSS combinations
const numberTypes = [
    'px',
    'vh',
    'vw',
    'rem',
    '%'
]

const wordTypes = [
    'center',
    'end',
    'top',
    'bottom',
    'left',
    'right'
]

const numericValueProperties = [
    'animation-iteration-count',
    'flex',
    'flex-grow',
    'flex-shrink',
    'line-height',
    'opacity',
    'order'
];

const keywordValueProperties = [
    'align-content',
    'align-items',
    'align-self',
    'direction',
    'justify-content',
    'list-style-position',
    'object-fit',
    'object-position',
    'text-align',
    'text-align-last',
    'text-justify'
];

const lengthValueProperties = [
    'border-bottom-width',
    'border-left-width',
    'border-right-width',
    'border-top-width',
    'column-gap',
    'column-rule-width',
    'column-width',
    'flex-basis',
    'font-size',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
    'max-height',
    'max-width',
    'min-height',
    'min-width',
    'outline-offset',
    'outline-width',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'text-indent',
    'width'
];

const numberPropertyTypes = [
    keywordValueProperties,
    lengthValueProperties,
    numericValueProperties
]

newCssTextBox();
