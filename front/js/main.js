(async () => {
    const table = document.getElementById('table')

    const users = await fetch('http://localhost:5555/user', {
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
            await fetch(url, {
                method: 'DELETE',
            }).then(res => res.json());
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

        const upbtn = document.createElement('button')
        upbtn.className =  "btn2"
        upbtn.textContent = "Обновить"

        upbtn.onclick = async () => {
            let data = {
                id: in1.value,
                nickname: in2.value,
                mail: in3.value
            }
            await fetch('http://localhost:5555/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(res => res.json());
        }

        const radio1 = document.createElement('input')
        const text1 = document.createElement('div')
        text1.className = "text"
        text1.textContent = "Администратор"
        radio1.className = "rd1"
        radio1.type = 'checkbox'
        const radio2 = document.createElement('input')
        const text2 = document.createElement('div')
        text2.className = "text"
        text2.textContent = "Пользователь"
        radio2.type = 'checkbox'
        radio2.className = "rd2"

        content.appendChild(in1)
        content.appendChild(in2)
        content.appendChild(in3)
        content.appendChild(dbtn)
        content.appendChild(upbtn)
        content.appendChild(radio1)
        content.appendChild(text1)
        content.appendChild(radio2)
        content.appendChild(text2)
        
        table.appendChild(content)
    })
})();

const addB = document.getElementById('add')
const nn = document.getElementById('n_name')
const nm = document.getElementById('n_mail')
const np = document.getElementById('n_pass')


addB.onclick = async () =>{
    let data = {
        nickname: nn.value,
        mail: nm.value,
        password: np.value
    }
    console.log(nn.value)

    await fetch('http://localhost:5555/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    }).then(res => res.json());




}

