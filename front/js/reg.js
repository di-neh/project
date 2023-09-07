const enter_wind = document.getElementById('wind')
const enter_link = document.getElementById('enter_link')
const reg = document.getElementById('reg');
const reg_form = document.getElementsByName('registration_form')


const nicknameInput = document.querySelector('#name');
const passwordInput = document.querySelector('#password');
const emailInput = document.querySelector('#email');

enter_link.onclick = (e) => {

    e.preventDefault();
    (async () => {
        const result = await fetch('../templates/enter.HTML').then(resp => resp.text());
        enter_wind.innerHTML = result;
        const result2 = await fetch('../js/Enter.js').then(resp => resp.text());
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
        const jsonData = await response.json(); // Ожидание разрешения промиса

        nicknameInput.classList.remove('error');
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');

        await jsonData.errors.forEach(element => {
            switch (element.path) {
                case 'nickname':
                    nicknameInput.classList.add('error');
                    
                    break;
                    
                case 'mail':
                    
                    emailInput.classList.add('error');

                    break;
                case 'password':
                    
                    passwordInput.classList.add('error');
                   
                   
                    break;
            }           
        })
        
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
        
    }

    document.location.href = "http://localhost:5555/main";

    return await response.json();
};

reg.onclick = async (e) => {

    e.preventDefault();
   
    const formElement2 = document.getElementById('registration_form'); // извлекаем элемент формы
    const formReg = new FormData(formElement2);


    const data = {
        nickname: formReg.get('name'),
        password: formReg.get('password'),
        mail: formReg.get('email'),
    } 
    // Отправляем данные только если все инпуты заполнены
    
    sendData('http://localhost:5555/registration', data);
    
 }
 