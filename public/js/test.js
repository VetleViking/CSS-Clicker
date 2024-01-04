function startGame() {
    const jsCode = document.getElementById("js-text");
    const cssCode = document.getElementById("css-text");
    const htmlCode = document.getElementById("text-html");
    const description = document.getElementById("taskDescription");

    //let currentGame = Object.entries(games)[Math.floor(Math.random() * Object.keys(games).length)][1];
    let currentGame = games["game1"];

    jsCode.innerHTML = currentGame.js;
    cssCode.innerHTML = currentGame.css;
    htmlCode.innerHTML = currentGame.html;
    run();

    let html = document.createElement("div");

    html.innerHTML = `<p>${currentGame.title}</p><p>${currentGame.description}</p><br>}`;  


    description.innerHTML = html.innerHTML;
}

games = {
    game1: {
        name: "game1",
        title: "Bakgrunnsfarger",
        description: "Gjør bakgrunnsfargen på  til rød (red eller #ff0000 i css).",
        html: `
        <div class="div1">Div med class div1</div>
        <div class="div2">Div med class div2</div>`,
        css: `.div1 {

}

.div2 {

}`,
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