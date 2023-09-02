const enter = document.getElementById('enter')

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
    
    document.location.href = "http://localhost:4000/main";

    return await response.json();
};

enter.onclick = (e) => {
    e.preventDefault();

    const eForm = document.getElementById('enter_form'); // извлекаем элемент формы
    const formEnter = new FormData(eForm);

    const data = {
        nickname: formEnter.get('name'),
        password: formEnter.get('password'),   
    }

    sendData('http://localhost:4000/api/login', data);  
}

const enter_wind = document.getElementById('wind')
const reg_link = document.getElementById('reg_link')

reg_link.onclick = () => {

    (async () => {
        const result = await fetch('../templates/reg_tm.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/reg_js.js').then(resp => resp.text());
        eval(result2)

        

    })()

}
