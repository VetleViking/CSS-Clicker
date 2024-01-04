function startGame() {
    console.log("startGame");
    const jsCode = document.getElementById("js-text");
    const cssCode = document.getElementById("css-text");
    const htmlCode = document.getElementById("text-html");

    let currentGame = Object.entries(games)[Math.floor(Math.random() * Object.keys(games).length)][1];

    jsCode.innerHTML = currentGame.js;
    cssCode.innerHTML = currentGame.css;
    htmlCode.innerHTML = currentGame.html;
    run();
    console.log("startGame end");
}

games = {
    game1: {
        name: "game1",
        title: "Bakgrunnsfarger",
        description: "Gjør bakgrunnsfargen på  til rød (red eller #ff0000 i css).",
        html: `
        <div class="div1">Div med class div1</div>
        <div class="div2">Div med class div2</div>`,
        css: `
.div1 {

}

.div2 {

}       `,
        js: ``
    },
    game2: {
        name: "game2",
        title: "game2",
        description: "game2",
        html: "s",
        css: "s",
        js: ""
    }
};