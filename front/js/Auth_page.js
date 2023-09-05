const enter_wind = document.getElementById('wind')

window.onload = (e) => {
    e.preventDefault();
    (async () => {
        const result = await fetch('../templates/enter.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/Enter.js').then(resp => resp.text());
        eval(result2)
    })()
}