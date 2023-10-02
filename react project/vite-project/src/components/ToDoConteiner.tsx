import Bolvanka from "./Bolvanka.tsx";
import AddBtn from "./AddBtn.tsx";
import styled from "styled-components";

const Conteiner = styled.div`
  display: flex;
  flex-direction: row;
  
`
const ToDoConteiner = () => {
    return (
        <Conteiner>
            <Bolvanka/>
            <AddBtn/>
        </Conteiner>
    );
};

export default ToDoConteiner;