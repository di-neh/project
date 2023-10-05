import styled from "styled-components";

import Button from "./Button.tsx";
import { useNavigate  } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";


const Reg = styled.div`
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

interface IRegProps{
    onClick?: () => void; 
} 

interface IREquestData{
    nickname: string,
    password: string,
    mail:string,
}


const Registration:React.FC<IRegProps> = ({onClick}) => {
    const navigate = useNavigate();

    const [inputNicknameValue, setInputNicknameValue] = useState('');
    const [inputMailValue, setInputMailValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const HandleInputNicknameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputNicknameValue(e.target.value);
    }

    const HandleInputMailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMailValue(e.target.value);
    }

    const HandleInputPasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPasswordValue(e.target.value);
    }

    const HandlleButtonClick = async () => {
        try {
            const reqData:IREquestData= {nickname: inputNicknameValue, mail: inputMailValue, password: inputPasswordValue};
            await axios.post('http://localhost:5661/registration', reqData, {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });
            navigate('/main');
             
        } catch (e) {
            console.log(e);
        }   
    }

    return (
        <Reg>
            <Button btnText={"У меня уже есть профиль"} onClick={onClick}></Button>
            <Input placeholder={"Логин"} onChange={HandleInputNicknameValue} value={inputNicknameValue} ></Input>
            <Input placeholder={"Пароль"} onChange = {HandleInputPasswordValue} value={inputPasswordValue}></Input>
            <Input placeholder={"Почта"} onChange = {HandleInputMailValue} value={inputMailValue}></Input>
            <Button btnText = {"Регистрация"} onClick={HandlleButtonClick} ></Button>
        </Reg>
    );
};

export default Registration;