function startGame() {
    const jsCode = document.getElementById("js-text");
    const cssCode = document.getElementById("css-text");
    const htmlCode = document.getElementById("text-html");
    const description = document.getElementById("taskDescription");

    let currentGame = Object.entries(games)[Math.floor(Math.random() * Object.keys(games).length)][1];

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
                message2: "-1000 social credits :(",
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
                message2: "Du får 100 social credits :)",
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
    if (currentGame.name == "game2") {
        if (true) {
            open({
                title: "Riktig!",
                message: "Du klarte det!",
                message2: "Du får 100 social credits :)",
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
    if (currentGame.name == "game3") {
        let iframe = document.getElementById("result");
        
        div1 = iframe.contentWindow.document.querySelector(".parentDiv");
        div2 = iframe.contentWindow.document.querySelector(".childDiv");

        if (window.getComputedStyle(div1).justifyContent == "center" && window.getComputedStyle(div1).display == "flex") {
            console.log("hei");
            open({
                title: "Riktig!",
                message: "Du klarte det!",
                message2: "Du får 100 social credits :)",
                onOk: () => {
                    console.log("ok");
                },
                onCancel: () => {
                    console.log("cancel");
                },

            });
        } else {
            console.log(window.getComputedStyle(div1).justifyContent);
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
        description: "Gjør bakgrunnsfargen på div1 til rød (red eller #ff0000 i css), og bakgrunnsfargen på div2 til blå (blue eller #0000ff).",
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
        title: "Et spill i guess",
        description: "Gidder ikke lage denne, bare gjør hva du vil og så trykk ferdig.",
        html: `<div class="parent"><div class="balle">Balle</div></div>`,
        css: `.parent {
    height: calc(100vh - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.balle {
    animation: tingtang 1s infinite;
}

@keyframes tingtang {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}`,
        js: ``
    }, 
    game3: {
        name: "game3",
        title: "Flexbox",
        description: "Gjør parentDiv til flex, og midtstill childenDiv horisontalt. parent er farget rød og child blå for å gjøre det lettere å se de.",
        html: `<div class="parentDiv"><div class="childDiv">Child</div></div>`,
        css: `.parentDiv {
    background-color: red;
}
.childDiv {
    width: 100px;
    background-color: blue;
}`,
        js: ``
    }
};
