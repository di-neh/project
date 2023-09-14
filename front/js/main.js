const table = document.getElementById('table');
const addB = document.getElementById('add')
const nn = document.getElementById('n_name')
const nm = document.getElementById('n_mail')
const np = document.getElementById('n_pass')
const checkBoxAdmin = document.getElementById('checkBoxAdmin')
const checkBoxUser = document.getElementById('checkBoxUser')

window.onload = async () => {
    tableFullFill();
}

async function tableFullFill(users){
    table.innerHTML = "";

    users = await fetch('http://localhost:5555/user', {
        method: 'GET',
    }).then(res => res.json());
    const objs = users;

    objs.forEach(user => {
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
            tableFullFill();
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

        const radio2 = document.createElement('input')
        const text2 = document.createElement('div')
        text2.className = "text"
        text2.textContent = "Пользователь"
        radio2.type = 'checkbox'
        radio2.className = "rd2"

        if(user.roles.includes(1)){
            radio2.checked = true;
        }

        const upbtn = document.createElement('button')
        upbtn.className =  "btn2"
        upbtn.textContent = "Обновить"

        upbtn.onclick = async () => {
            let roles_arr = [];

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
            const response = await fetch('http://localhost:5555/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then();
            tableFullFill();
            // if(response.status == 400){
            //     alert('У вас нет доступа к обновлению данных пользователя!')
            // }
        }

        content.appendChild(in1)
        content.appendChild(in2)
        content.appendChild(in3)
        content.appendChild(radio1)
        content.appendChild(text1)
        content.appendChild(radio2)
        content.appendChild(text2)
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

    const response = await fetch('http://localhost:5555/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
    }).then(res => res.json());

    // if(response.status == 403){
    //     alert('У вас нет доступа к созданию нового пользователя!')
    // }

    const users = await fetch('http://localhost:5555/user', {
        method: 'GET',
    }).then(res => res.json());

    // users.forEach(element =>{
    //     const user_name = nn;
    //     const user_mail = nm;
    //     switch (element.nickname) {
    //         case user_name.value:
    //             alert('Пользователь с таким именем уже существует!')
    //             break;
            
    //     }
    //     switch(element.mail){
    //         case user_mail.value:
    //             alert('Пользователь с такой почтой уже существует!')
    //             break;
    //     }
        
    // })

    nn.classList.remove('error')
    nm.classList.remove('error')
    np.classList.remove('error')

    response.errors.forEach(element => {
        switch (element.path) {
            case 'nickname':
                nn.classList.add('error')

                break;

            case 'password':
                np.classList.add('error')
                break;

            case 'mail':
                nm.classList.add('error')
                break;
        }
    })

    

}

