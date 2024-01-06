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

    html.innerHTML = `<p id="gameTitle">${currentGame.title}</p><p>${currentGame.description}</p>`;  


    description.innerHTML = html.innerHTML;

    let timer = document.getElementById("timerTask");
    let time = 60;
    timer.innerHTML = time;
    let interval = setInterval(() => {
        time--;
        timer.innerHTML = time;
        if (time == 0) {
            clearInterval(interval);
            open({
                title: "Tiden er ute!",
                message: "Du fikk ikke til oppgaven.",
                message2: "-1000 social credits :(.",
                onOk: () => {
                    console.log("ok");
                },
                onCancel: () => {
                    console.log("cancel");
                },

            });
        }
    }, 1000);
}

document.getElementById("submitBtn").addEventListener("click", () => {
    let currentGame = undefined;
    for (let i = 0; i < Object.keys(games).length; i++) {
        if (document.getElementById("gameTitle").innerHTML == games[Object.keys(games)[i]].title) {
            currentGame = games[Object.keys(games)[i]];
            break;
        }
    }
    if (currentGame.name == "game1") {
        let iframe = document.getElementById("result");
        
        div1 = iframe.contentWindow.document.querySelector(".div1");
        div2 = iframe.contentWindow.document.querySelector(".div2");

        if (window.getComputedStyle(div1).backgroundColor == "rgb(255, 0, 0)" && window.getComputedStyle(div2).backgroundColor == "rgb(0, 0, 255)") {
            open({
                title: "Riktig!",
                message: "Du klarte det!",
                message2: "Du får 100 social credits :).",
                onOk: () => {
                    console.log("ok");
                },
                onCancel: () => {
                    console.log("cancel");
                },

            });
        } else {
            open({
                title: "Feil!",
                message: "Du klarte det ikke.",
                message2: "-100 social credits :(",
                onOk: () => {
                    console.log("ok");
                },
                onCancel: () => {
                    console.log("cancel");
                },

            });
        }
    }
});

games = {
    game1: {
        name: "game1",
        title: "Bakgrunnsfarger",
        description: "Gjør bakgrunnsfargen på div1 til rød (red eller #ff0000 i css), og bakgrunnsfargen på div2 til blue (blue eller #0000ff).",
        html: `
        <div class="div1" id="test">Div med class div1</div>
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
