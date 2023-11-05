var numHtml = document.getElementById("number")
var num = 0;
var cssBox = document.getElementById('cssBox');
var cssText = document.getElementById("cssText");
var rightOrNot = document.getElementById('rightOrNot');

function clicker() {
    num += 1;
    numHtml.innerHTML = num + "$";
}

function kjøpeCss(clas, price) {
    var test = document.getElementsByClassName(clas);
    console.log(num, price);
    if (num >= price) {
        num -= 10;    
        for (let i = 0; i < test.length; i++) {
            if(test[i].classList.contains("bought")) {} else {
                test[i].classList.add("on", "bought");
            }
        }
        numHtml.innerHTML = num + "$";
    }
}

function enableDisableCss(clas) {
    var test = document.getElementsByClassName(clas);
    for (let i = 0; i < test.length; i++) {
        if(test[i].classList.contains("on", "bought")) {
            test[i].classList.remove("on");
        } else if(test[i].classList.contains("bought")) {
            test[i].classList.add("on");
        }
    }
}

function submitCss() {
    if (cssBox.value == cssText.innerHTML) {
        num += 1;
        numHtml.innerHTML = num + "$";
        rightOrNot.innerHTML = "Riktig! :D";
        
        newCssTextBox();
    } else {
        rightOrNot.innerHTML = "Feil. :(";
    }
    
    cssBox.value = "";
}

function newCssTextBox() {
    var chooseNum = Math.floor(Math.random() * numberPropertyTypes.length);
    var newCssText =  numberPropertyTypes[chooseNum];
    newCssText = newCssText[Math.floor(Math.random() * newCssText.length)];

    if(chooseNum == 0) {
        newCssText = newCssText + ": " + wordTypes[Math.floor(Math.random() * wordTypes.length)] + ";";       
    } else if (chooseNum == 1) {
        var chNum1 = Math.floor(Math.random() * 100) + 1;
        newCssText = newCssText + ": " + chNum1 + numberTypes[Math.floor(Math.random() * numberTypes.length)] + ";";       
    } else if (chooseNum == 2) {
        newCssText = newCssText + ": " + Math.floor(Math.random() * 10) / 10 + ";";       
    } 
    cssText.innerHTML = newCssText
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("keypress", function(event) {
    var isFocused = (document.activeElement === cssBox);
    if (event.key == "Enter" && isFocused) {
      submitCss();
    }
});

var numberTypes = [
    'px',
    'vh',
    'vw',
    'rem',
    '%'
]

var wordTypes = [
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
  
var lengthValueProperties = [
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
  
var numberPropertyTypes = [
    keywordValueProperties,
    lengthValueProperties, 
    numericValueProperties
]


newCssTextBox();