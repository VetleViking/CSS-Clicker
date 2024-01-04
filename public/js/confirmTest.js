window.addEventListener("load", () => { open({
        title: "s",
        message: "s",
        message2: "s",
        onOk: () => {
            startGame();
        },
        onCancel: () => {
            window.location.replace("index.html");
        },
    });
});