window.addEventListener("load", () => { open({
        title: "s",
        message: "s",
        message2: "s",
        onOk: () => {
            startGame();
        },
        onCancel: () => {
            startGame();
        },
    });
});