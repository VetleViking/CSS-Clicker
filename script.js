
var numHtml = document.getElementById("number")
var num = 0;




function clicker() {
    num += 1;
    numHtml.innerHTML = num + "$";
}

function kjøpeCss(clas) {
    var test = document.getElementsByClassName(clas);
    console.log(test);

}

function enableDisableCss(clas) {
    var test = document.getElementById(clas);
    if(test.classList.contains("on")) {
        test.classList.remove("on")
    } else {
        test.classList.add("on");
    } 
}