import styled from "styled-components";
import Button from "./Button.tsx";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input.tsx";


const EnterWindow = styled.div`
  background: #383a3f;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-left: 35%;
  margin-right: 35%;
  margin-top: 100px;
`;



interface IEnterProps{
    onClick?: () => void; 
} 

interface IRequestData{
    nickname: string,
    password: string,
}





const Enter: React.FC<IEnterProps> = ({onClick}) => {

    const navigate = useNavigate();

    const [inputLoginVal, setInputLoginVal] = useState<string>('');

    const HandlerInputLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLoginVal(e.target.value);
    }

    const [inputPasswordnVal, setInputPasswordnVal] = useState<string>('');

    const HandlerInputPasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPasswordnVal(e.target.value);
    }
    


    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
          event.preventDefault();
          logIn();
          // Выполняйте дополнительные действия, но не отправляйте форму
        }
      }

    const logIn = async () => { 
        try {  
            const reqData:IRequestData = {nickname: inputLoginVal, password: inputPasswordnVal}
            await axios.post('http://localhost:5661/login', reqData, {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });
            navigate('/main');
        } catch (e) {
            console.log(e);
        }
        
    }

    return (

        <EnterWindow>
            <Button btnText={"У вас нет учетной записи?"} onClick={onClick}></Button>
<<<<<<< Updated upstream
            <Input ph={"Логин"}  onChange = {HandlerInputLoginValue} value={inputLoginVal}></Input>
            <Input type={"password"}  ph={"Пароль"} onChange = {HandlerInputPasswordValue} value={inputPasswordnVal}></Input>
            <Button btnText = {"Вход"} onClick={logIn} ></Button>
=======
            <Input onKeyDown={handleKeyPress} placeholder={"Логин"}  onChange = {HandlerInputLoginValue} value={inputLoginVal}></Input>
            <Input onKeyDown={handleKeyPress} type = "password"  placeholder={"Пароль"} onChange = {HandlerInputPasswordValue} value={inputPasswordnVal}></Input>
            <Button btnText = {"Vhod"} onClick={logIn} ></Button>
>>>>>>> Stashed changes
        </EnterWindow>
    );
};

export default Enter;