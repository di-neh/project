import styled from "styled-components";
import Input from "./Input.tsx";
import Button from "./Button.tsx";

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

interface IRegProps{
    onClick?: () => void; 
} 

const Registration:React.FC<IRegProps> = ({onClick}) => {
    return (
        <Reg>
            <Button btnText={"У меня уже есть профиль"} onClick={onClick}></Button>
            <Input ph={"Логин"}></Input>
            <Input ph={"Пароль"}></Input>
            <Input ph={"Почта"}></Input>
            <Button btnText = {"Регистрация"} ></Button>
        </Reg>
    );
};

export default Registration;