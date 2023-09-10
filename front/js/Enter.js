const enter_wind = document.getElementById('wind')
const reg_link = document.getElementById('reg_link')
const enter = document.getElementById('enter')
const enter_login = document.getElementById('name');
const enter_password = document.getElementById('password');
const log_name = document.getElementById('log_name');
const log_password = document.getElementById('log_password');
const nickname_log = document.querySelector('#name');
const password_log = document.querySelector('#password');

const sendData = async (url, data) => {
    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        method: 'POST',
        body: JSON.stringify(data),
    });

    if(!response.ok){
        const jsonData = await response.json();

        nickname_log.classList.remove('error');
        password_log.classList.remove('error');
        log_name.style.display = 'none';
        log_password.style.display= 'none';
       
        switch (jsonData.path){
            case 'nickname':
                
                nickname_log.classList.add('error');
                log_name.style.display = 'block';
                log_name.innerText = (jsonData.message)
                break;
        }
            
        switch (jsonData.path){
            case 'password':
                password_log.classList.add('error');
                log_password.style.display = 'block';
                log_password.innerText = (jsonData.message)  
        }
    
        // if(jsonData.path = 'nickname'){
        //     nickname_log.classList.add('error');
        //     log_name.style.display = 'block';
        //     log_name.innerText = (jsonData.message)
            
        //     if(jsonData.path = 'password'){
        //         password_log.classList.add('error');
        //         log_password.style.display = 'block';
        //         log_password.innerText = (jsonData.message)
                
        //     }
        // }

        
        
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
