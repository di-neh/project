import styled from "styled-components";
import Button from "./Button.tsx";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterWindow = styled.div`
  background-color: grey;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-left: 35%;
  margin-right: 35%;
  margin-top: 100px;
`;

const Input = styled.input`
  background-color: white;
  width: 100%;
  border: 0px;
  text-align:center;
  color: black;
  &:focus{
    outline: none;
  }
`

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
            <Input placeholder={"Логин"}  onChange = {HandlerInputLoginValue} value={inputLoginVal}></Input>
            <Input placeholder={"Пароль"} onChange = {HandlerInputPasswordValue} value={inputPasswordnVal}></Input>
            <Button btnText = {"Vhod"} onClick={logIn} ></Button>
        </EnterWindow>
    );
};

export default Enter;