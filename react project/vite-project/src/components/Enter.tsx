import styled from "styled-components";
import Button from "./Button.tsx";
import Input from "./Input.tsx";

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
const Enter = () => {
    return (
        <EnterWindow>
            <Button btnText={"У вас нет учетной записи?"} ></Button>
            <Input ph={"Логин"}></Input>
            <Input ph={"Пароль"}></Input>
            <Button btnText = {"Опять же соси хуй быдло"}></Button>
        </EnterWindow>
    );
};

export default Enter;