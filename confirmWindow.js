document.getElementById('btnSelgeSide').addEventListener('click', () => {
    open({
        title: 'Selge siden?',
        message: 'Er du sikker på at du vil selge siden din? Du vil få 1 dollar per 10. linje du har skrevet. nåværende antall dollar du ville fått: ' + Math.floor(cssLinesTotal / 10) + '$',
        //Trenger å få tak i cssLinesTotal på en eller annen måte :/
        onOk: () => {
            selgeSide();
        }
    })
});


function open(options) {
    options = Object.assign({}, {
        title: '',
        message: '',
        okText: 'Ja',
        cancelText: 'Nei',
        onOk: function () { },
        onCancel: function () { }
    }, options);

    const html = `
        <div class="confirm">
            <div class="confirmWindow">
                <div class="confirmTitlebar">
                    <p class="confirmTitle">${options.title}</p>
                    <div class="confirmClose"><p>&times;</p></div>
                </div>
                <div class="confirmContent"><p>${options.message}</p></div>
                <div class="confirmButtons">
                    <div class="confirmButton confirmButtonYe"><p>${options.okText}</p></div>
                    <div class="confirmButton confirmButtonNo"><p>${options.cancelText}</p></div>
                </div>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html;

    // Elements
    const confirmEl = template.content.querySelector('.confirm');
    const btnClose = template.content.querySelector('.confirmClose');
    const btnOk = template.content.querySelector('.confirmButtonYe');
    const btnCancel = template.content.querySelector('.confirmButtonNo');

    confirmEl.addEventListener('click', e => {
        if (e.target === confirmEl) {
            options.onCancel();
            close(confirmEl);
        }
    });

    btnOk.addEventListener('click', () => {
        options.onOk();
        close(confirmEl);
    });

    [btnCancel, btnClose].forEach(el => {
        el.addEventListener('click', () => {
            options.onCancel();
            close(confirmEl);
        });
    });

    document.body.appendChild(template.content);
}

function close(confirmEl) {
    confirmEl.classList.add('confirm--close');
    document.body.removeChild(confirmEl);
}

