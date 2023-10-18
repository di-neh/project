import styled from "styled-components";
import Input from "../auth/Input.tsx";

const Box = styled.div`
  position: absolute;
  width: 500px;
  left: 30%;
  top: 100px;
  background: #383a3f;
  border-radius: 10px;
  padding: 25px;
  color: #ddd;
`
const Profile = () => {
    return (
        <div>
            <Box>
                <h1>Профиль</h1>
                <h2>Имя</h2>
                <Input value={""} ph={"Арсений"}></Input>
                <h2>Фамилия</h2>
                <Input value={""} ph={"Головатч"}></Input>
                <h2>Почта</h2>
                <Input value={""} ph={""}></Input>
            </Box>
        </div>
    );
};

export default Profile;