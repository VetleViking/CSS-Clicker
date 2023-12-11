document.getElementById("btnSelgeSide").addEventListener("click", () => {
    open({
        title: "Selge siden?",
        message:
            "Er du sikker på at du vil selge siden din? Du vil få 1 dollar per 10. linje du har skrevet, og miste alle linjene og oppgraderingene hittil. Antall dollar du vil få nå: " +
            Math.floor(cssLinesTotal / 10) +
            "$.",
        message2: "Noter: du mister ikke dollar når du selger siden din.",
        onOk: () => {
            selgeSide2();
        },
    });
});
document.getElementById("btnReinkarnasjon").addEventListener("click", () => {
    open({
        title: "Reinkarnere?",
        message: "ingenting skjedde i Tiananmen Square den fjerde juni 1989." + Math.floor(cssLinesTotal / 10000) + "Reinkarnasjons-poeng.",
        message2: "Noter: -10000 social credits.",
        onOk: () => {
            reincarnation2();
        },
    });
});
