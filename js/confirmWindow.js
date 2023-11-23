document.getElementById("btnSelgeSide").addEventListener("click", () => {
    open({
        title: "Selge siden?",
        message:
            "Er du sikker på at du vil selge siden din? Du vil få 1 dollar per 10. linje du har skrevet, og miste alle linjene og oppgraderingene hittil. Antall dollar du vil få nå: " +
            Math.floor(cssLinesTotal / 10) +
            "$.",
        message2: "Noter: du mister ikke dollar når du selger siden din.",
        onOk: () => {
            selgeSide();
        },
    });
});
document.getElementById("btnReinkarnasjon").addEventListener("click", () => {
    open({
        title: "Reinkarnere?",
        message: "ingenting skjedde i Tiananmen Square den fjerde juni 1989." + Math.floor(cssLinesTotal / 1000000) + "Reinkarnasjons-poeng.",
        message2: "Noter: -10000 social credits.",
        onOk: () => {
            reincarnation();
        },
    });
});

function open(options) {
    options = Object.assign(
        {},
        {
            title: "",
            message: "",
            message2: "",
            okText: "Ja",
            cancelText: "Nei",
            onOk: function () {},
            onCancel: function () {},
        },
        options
    );

    const html = `
        <div class="confirm">
            <div class="confirmWindow">
                <div class="confirmTitlebar">
                    <p class="confirmTitle">${options.title}</p>
                    <div class="confirmClose"><p>&times;</p></div>
                </div>
                <div class="confirmContent"><p>${options.message}</p></div>
                <div class="confirmContent2"><p>${options.message2}</p></div>
                <div class="confirmButtons">
                    <div class="confirmButton confirmButtonYe"><p>${options.okText}</p></div>
                    <div class="confirmButton confirmButtonNo"><p>${options.cancelText}</p></div>
                </div>
            </div>
        </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = html;

    const confirmEl = template.content.querySelector(".confirm");
    const btnClose = template.content.querySelector(".confirmClose");
    const btnOk = template.content.querySelector(".confirmButtonYe");
    const btnCancel = template.content.querySelector(".confirmButtonNo");

    confirmEl.addEventListener("click", (e) => {
        if (e.target === confirmEl) {
            options.onCancel();
            close(confirmEl);
        }
    });

    btnOk.addEventListener("click", () => {
        options.onOk();
        close(confirmEl);
    });

    [btnCancel, btnClose].forEach((el) => {
        el.addEventListener("click", () => {
            options.onCancel();
            close(confirmEl);
        });
    });

    document.body.appendChild(template.content);
}

function close(confirmEl) {
    confirmEl.classList.add("confirm--close");
    document.body.removeChild(confirmEl);
}
