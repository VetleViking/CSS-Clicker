document.getElementById("btnReinkarner").addEventListener("click", () => {
    open({
        title: "Reinkarnere?",
        message: "ingenting skjedde i Tiananmen Square den fjerde juni 1989." + 1000000 + "Reinkarnasjons-poeng.",
        message2: "Noter: -10000 social credits.",
        onOk: () => {
            window.location.replace("index.html");
        },
    });
});
