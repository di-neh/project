


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
        radio1.type = 'radio'
        const radio2 = document.createElement('input')
        radio2.type = 'radio'


        content.appendChild(in1)
        content.appendChild(in2)
        content.appendChild(in3)
        content.appendChild(dbtn)
        content.appendChild(upbtn)
        content.appendChild(radio1)
        content.appendChild(radio2)


        table.appendChild(content)




    })
    // for(let key in objs){
    //
    //     const obj = document.createElement('button');
    //
    //     obj.textContent = objs[key].name  objs[key].id;
    //     obj.className = "btnUser"
    //
    //     switch (Object.keys(objs[key]).length) {
    //         case 4:
    //             obj.onclick = () => {ShowModal(objs[key], Modal);};
    //             break;
    //         case 5:
    //             obj.onclick = () => {ShowModal(objs[key], ModalConsumption);};
    //             break;
    //         case 6:
    //             obj.onclick = () => {ShowModal(objs[key], ModalProd);};
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     obj.addEventListener('mouseenter', () => {
    //         obj.textContent = objs[key].id;
    //     });
    //     obj.addEventListener('mouseleave', () => {
    //         obj.textContent = objs[key].name  objs[key].id;
    //     });
    //
    //     Wrapper.appendChild(obj);
    // }
})();


