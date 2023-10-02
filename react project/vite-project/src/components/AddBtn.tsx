import styled from "styled-components";

const Add = styled.button`
  height: 50%;
  width: 150px;
  border-radius: 5px;
  border: solid 0px;
  background-color: black;
  color: grey;
  margin-top: 20px;
  cursor: grab;
  
`

const AddBtn = () => {
    return (
        <Add>
            Добавить колонку
        </Add>
    );
};

export default AddBtn;