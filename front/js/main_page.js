const enter_wind = document.getElementById('wind')
const reg_link = document.getElementById('reg_link')

reg_link.onclick = () => {

    (async () => {
        const result = await fetch('../templates/registration.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        // const result2 = await fetch('../js/reg_js.js').then(resp => resp.text());
        // eval(result2)



    })()

}