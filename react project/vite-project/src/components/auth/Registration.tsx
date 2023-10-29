import styled from "styled-components";
import MySVG from "../ToDo/SVG/MySVG.tsx";
import Button from "./Button.tsx";
import { useNavigate  } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Input from "./Input.tsx";
import { ICustomError, IRequestData } from "../../types/Types.ts";


const Reg = styled.div`
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

interface IRegProps{
    onClick?: () => void; 
} 

const Registration:React.FC<IRegProps> = ({onClick}) => {
    const navigate = useNavigate();

    const [inputNicknameValue, setInputNicknameValue] = useState('');
    const [inputMailValue, setInputMailValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputNameDisp, setInputNameDisp] = useState<string>('none');
    const [inputPassDisp, setInputPassDisp] = useState<string>('none');
    const [inputMailDisp, setInputMailDisp] = useState<string>('none');

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
            const reqData:IRequestData= {nickname: inputNicknameValue, mail: inputMailValue, password: inputPasswordValue};
            await axios.post('http://localhost:5661/registration', reqData, {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });
            navigate('/main');
        } catch (e) { 
            setInputNameDisp('none');
            setInputPassDisp('none');
            setInputMailDisp('none');
            const responseData =  (e as ICustomError).response.data;
            responseData.errors.forEach((element: { path: string; }) => {
                switch(element.path) {
                    case 'nickname':
                        setInputNameDisp('flex');

                        break  ;
                    case 'password':
                        setInputPassDisp('flex');
                        break;
                    case 'mail':
                        setInputMailDisp('flex');
                        break;
                }
            });  
        }   
    }

    return (
        <Reg>
            <Button btnText={"У меня уже есть профиль"} onClick={onClick}></Button>
            <div style={{display:"flex", width:'100%', alignItems:'center'}}>
                <Input  ph={"Логин"} onChange={HandleInputNicknameValue} value={inputNicknameValue} ></Input>
                <MySVG display={inputNameDisp}/>
            </div>
           <div style={{display:"flex", width:'100%', alignItems:'center'}}>
                <Input  type = "password" ph={"Пароль"} onChange = {HandleInputPasswordValue} value={inputPasswordValue}></Input>
                <MySVG display={inputPassDisp}/>
           </div>
            <div style={{display:"flex", width:'100%', alignItems:'center'}}>
                <Input  ph={"Почта"} onChange = {HandleInputMailValue} value={inputMailValue}></Input>
                <MySVG display={inputMailDisp}/>
            </div>
            
            <Button btnText = {"Регистрация"} onClick={HandlleButtonClick} ></Button>
        </Reg>
    );
};

export default Registration;