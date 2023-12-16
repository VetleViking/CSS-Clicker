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
