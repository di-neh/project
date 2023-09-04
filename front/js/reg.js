const enter_wind = document.getElementById('wind')

const enter_link = document.getElementById('enter_link')

enter_link.onclick = () => {

    (async () => {
        const result = await fetch('../templates/enter.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/main_page.js').then(resp => resp.text());
        eval(result2)
    })()

}

const sendData = async (url, data) => {

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify(data),
    });

    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }

    document.location.href = "http://localhost:5555/main";

    return await response.json();
};

reg.onclick = (e) => {
    e.preventDefault();

    const formElement2 = document.getElementById('register'); // извлекаем элемент формы
    const formReg = new FormData(formElement2);

    const data = {
        nickname: formReg.get('name'),
        password: formReg.get('password'),
        mail: formReg.get('email'),

    }


    sendData('http://localhost:5555/api/registration', data);
}