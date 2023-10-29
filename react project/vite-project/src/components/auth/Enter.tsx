import styled from "styled-components";
import Button from "./Button.tsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input.tsx";
import MySVG from "../ToDo/SVG/MySVG.tsx";
import { ICustomError, IRequestData } from "../../types/Types.ts";



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

const Enter: React.FC<IEnterProps> = ({onClick}) => {

    const navigate = useNavigate();

    const [inputLoginVal, setInputLoginVal] = useState<string>('');
    const [inputPasswordnVal, setInputPasswordnVal] = useState<string>('');
    const [inputNameDisp, setInputNameDisp] = useState<string>('none');
    const [inputPassDisp, setInputPassDisp] = useState<string>('none');
    const HandlerInputLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLoginVal(e.target.value);
    }

    const HandlerInputPasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPasswordnVal(e.target.value);
    }
    
    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
          event.preventDefault();
          logIn();
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

        } catch (err) {
            const e = err as ICustomError;
            setInputNameDisp('none');
            setInputPassDisp('none')

            e.response.data.errors.forEach((element: { path: string; }) => {
                switch(element.path) {
                    case 'nickname':
                        setInputNameDisp('flex');
                        break  ;

                    case 'password':
                        setInputPassDisp('flex');
                        break; 
                }
            });
        }
    }

    return (

        <EnterWindow>
            <Button btnText={"У вас нет учетной записи?"} onClick={onClick}></Button>
            <div style={{display:"flex", width:'100%', alignItems:'center'}}>
                <Input onKeyDown={handleKeyPress} ph={"Логин"}  onChange={HandlerInputLoginValue} value={inputLoginVal}></Input>
                <MySVG display={inputNameDisp}/>
            </div>
            <div style={{display:"flex", width:'100%', alignItems:'center'}}>
                <Input onKeyDown={handleKeyPress} type = "password"  ph={"Пароль"} onChange={HandlerInputPasswordValue} value={inputPasswordnVal}></Input>
                <MySVG display={inputPassDisp}/>
            </div>
            
            <Button btnText = {"Vhod"} onClick={logIn} ></Button>
        
        </EnterWindow>
    );
};

export default Enter;