const enter_wind = document.getElementById('wind')
const reg_link = document.getElementById('reg_link')
const enter = document.getElementById('enter')


const sendData = async (url, data) => {
    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        method: 'POST',
        body: JSON.stringify(data),
    });

    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }

    document.location.href = "http://localhost:5555/main";

    return await response.json();
}

enter.onclick = (e) => {
    e.preventDefault();

    const formElement2 = document.getElementById('enter_form');
    const formReg = new FormData(formElement2);

    const data = {
        nickname: formReg.get('name'),
        password: formReg.get('password'),

    }


    sendData('http://localhost:5555/login', data);
}

reg_link.onclick = (e) => {
    e.preventDefault();
    (async () => {
        const result = await fetch('../templates/registration.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/reg.js').then(resp => resp.text());
        eval(result2)
    })()

}
