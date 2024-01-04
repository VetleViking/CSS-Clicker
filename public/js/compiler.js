const html_code = document.querySelector('.html-code textarea');
const css_code = document.querySelector('.css-code textarea');
const js_code = document.querySelector('.js-code textarea');
const result = document.querySelector('#result');

function run() {

    result.contentDocument.body.innerHTML = `<style>${css_code.value}</style>` + html_code.value;
    result.contentWindow.eval(js_code.value);
}

html_code.onkeyup = () => run();
css_code.onkeyup = () => run();
js_code.onkeyup = () => run();

run()