const enter_wind = document.getElementById('wind')
const reg_link = document.getElementById('reg_link')
const enter_link = document.getElementById('enter_link')

reg_link.onclick = () => {

    (async () => {
        const result = await fetch('../templates/registration.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/reg.js').then(resp => resp.text());
        eval(result2)
    })()
}

 enter_link.onclick = () => {

     (async () => {
         const result = await fetch('../templates/enter.HTML').then(resp => resp.text());
         enter_wind.innerHTML = result;
     })()

}