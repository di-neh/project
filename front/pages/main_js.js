//MAIN

window.onload = async (e) =>{
    e.preventDefault();

    const url = 'http://localhost:4000/api/main';

    const responce = await fetch(url , {
        method: 'GET'
    });

    if(responce.status == 400 || responce.status == 401){
        document.location.href = "http://localhost:4000/registration";
        return;
    }
}

const wind = document.querySelector('.wind');

const tasks = document.getElementById('tasks');



tasks.onclick = () => {
    (async () => {
        const result = await fetch(`../templates/TM.html`).then(resp => resp.text());
        wind.innerHTML = result;
        const result2 = await fetch('../js/tm_js.js').then(resp => resp.text());
        eval(result2);
    })();

}

const profile = document.getElementById('profile')

profile.onclick = () => {

    (async () => {
        const result = await fetch('../templates/profile.HTML').then(resp => resp.text());
        wind.innerHTML = result;
    })()

}

