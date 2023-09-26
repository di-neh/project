const table = document.getElementById('table');
const addB = document.getElementById('add')
const nn = document.getElementById('n_name')
const nm = document.getElementById('n_mail')
const np = document.getElementById('n_pass')
const checkBoxAdmin = document.getElementById('checkBoxAdmin')
const checkBoxUser = document.getElementById('checkBoxUser')
const btnLogOut = document.getElementById('btnLogOut');
const checkBoxContainer = document.getElementById('checkBoxContainer');

const buttonPasswordChangeNew = document.getElementById('buttonPasswordChangeNew');
const inputPasswordChangeNew = document.getElementById('inputPasswordChangeNew');
const inputPasswordChangeOld = document.getElementById('inputPasswordChangeOld');


window.onload = async () => {
    tableFullFill();
    profile();
}

buttonPasswordChangeNew.onclick = async () => {
    inputPasswordChangeOld.classList.remove('error');
    inputPasswordChangeNew.classList.remove('error');

    let data = {
        passwordOld: inputPasswordChangeOld.value,
        passwordNew: inputPasswordChangeNew.value,
    }

    let response = await fetch('http://localhost:5555/main/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }).then();
    
    if(!response.ok){
        response = await response.json();
        console.log(response);
        response.errors.forEach(error => {
            switch(error.path){
                case 'passwordNew':
                    inputPasswordChangeNew.classList.add('error');
                break;
                case 'passwordOld':
                    inputPasswordChangeOld.classList.add('error');
                break;
            }
        })   
    }else{
        inputPasswordChangeNew.value = "";
        inputPasswordChangeOld.value = "";
    }

    
}

btnLogOut.onclick = async () => {
    document.location.href = "http://localhost:5555/registration";
    await fetch('http://localhost:5555/main', {
        method: 'delete',
    }).then(res => res.json()); 
}

async function tableFullFill(users){
    table.innerHTML = "";


    users = await fetch('http://localhost:5555/user', {
        method: 'GET',
    }).then(res => res.json());
    const objs = users;



    objs.forEach(user => {
        const box = document.getElementById('add_block')
        box.style.display = 'flex'

        const content = document.createElement('div')
        content.className =  "content"

        const dbtn = document.createElement('button')
        dbtn.className =  "btn1"
        dbtn.textContent = "Удалить"

        let url = 'http://localhost:5555/user/'+ user.id
        dbtn.onclick = async () => {
            const response = await fetch(url, {
                method: 'DELETE',
            }).then();
            
            // if(response.status == 403){
            //     alert('У вас нет доступа к удалению пользователя!')
            // }
            if(response.ok){
                tableFullFill();
            }  
        }

        const in1 = document.createElement('input')
        in1.className =  "in1"
        in1.value = user.id

        const in2 = document.createElement('input')
        in2.className =  "in2"
        in2.value = user.nickname

        const in3 = document.createElement('input')
        in3.className =  "in3"
        in3.value = user.mail

        const radio1 = document.createElement('input')
        const text1 = document.createElement('div')
        text1.className = "text"
        text1.textContent = "Администратор"
        radio1.className = "rd1"
        radio1.type = 'checkbox'

        if(user.roles.includes(0)){
            radio1.checked = true;
        }
        const checkBoxContainerDinamic = document.createElement('div');
        checkBoxContainerDinamic.classList.add('checkBoxContainer');


        const radio2 = document.createElement('input')
        const text2 = document.createElement('div')
        text2.className = "text"
        text2.textContent = "Пользователь"
        radio2.type = 'checkbox'
        radio2.className = "rd2"

        if(user.roles.includes(1)){
            radio2.checked = true;
        }
        checkBoxContainerDinamic.appendChild(radio1);
        checkBoxContainerDinamic.appendChild(text1);
        checkBoxContainerDinamic.appendChild(radio2);
        checkBoxContainerDinamic.appendChild(text2);
  

        const upbtn = document.createElement('button')
        upbtn.className =  "btn2"
        upbtn.textContent = "Обновить"

        upbtn.onclick = async () => {
            let roles_arr = [];

            in2.classList.remove('error');
            in3.classList.remove('error');
            radio1.classList.remove('error');
            radio2.classList.remove('error');

            if(radio1.checked){
                roles_arr.push(0);
            }
            if(radio2.checked){
                roles_arr.push(1);
            }
            let data = {
                id: in1.value,
                nickname: in2.value,
                mail: in3.value,
                roles: roles_arr
            }
            let response = await fetch('http://localhost:5555/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then();

            if(response.ok){
                tableFullFill();
            }else{
                response = await response.json();
                response.errors.forEach(error => {
                switch(error.path){
                    case 'nickname':
                    case'already_name':
                        in2.classList.add('error');
                    break;

                    case 'mail':
                        in3.classList.add('error');
                    break;
                    case 'roles':
                        checkBoxContainerDinamic.classList.add('error');
                    break;
                }
            })  
            }
            
        }

        content.appendChild(in1)
        content.appendChild(in2)
        content.appendChild(in3)
        content.appendChild(checkBoxContainerDinamic)
        content.appendChild(dbtn)
        content.appendChild(upbtn)
        
        table.appendChild(content)
    })
}


addB.onclick = async () =>{

    let roles_arr = [];

    if(checkBoxAdmin.checked){
        roles_arr.push(0);
    }
    if(checkBoxUser.checked){
        roles_arr.push(1);
    }

    let data = {
        nickname: nn.value,
        mail: nm.value,
        password: np.value,
        roles: roles_arr
    }

    let response = await fetch('http://localhost:5555/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    }).then();

    nn.classList.remove('error');
    nm.classList.remove('error');
    np.classList.remove('error');
    checkBoxContainer.classList.remove('error');

    if(response.ok){
        nn.value = nm.value = np.value = "";
        checkBoxAdmin.checked = checkBoxUser.checked = false;
        tableFullFill();
    }else{
        response = await response.json();
        response.errors.forEach(error => {
            switch(error.path){
                case 'nickname':
                case'already_name':
                    nn.classList.add('error');
                break;

                case 'mail':
                    nm.classList.add('error');
                break;
                case 'password':
                    np.classList.add('error');
                break;
                case 'roles':
                    console.log('chzh');
                    checkBoxContainer.classList.add('error');
                break;
            }
        })  
    }

    


}

async function profile(){
    const name = document.getElementById('p_name')
    const mail = document.getElementById('p_mail')
    const role = document.getElementById('p_role')

    let profile= await fetch('http://localhost:5555/main/user', {
        method: 'GET',
    }).then(res => res.json());

    name.textContent = ("Ваш логин: " + profile.nickname)
    mail.textContent = ("Ваша почта: " + profile.mail)
    role.textContent = ("Ваша роль: " + profile.role)

}
