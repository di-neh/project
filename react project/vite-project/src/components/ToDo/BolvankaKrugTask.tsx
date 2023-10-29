import styled from "styled-components";
import { IBolvankaKrugTaskProps } from "../../types/Types";

const DivKrug = styled.div`
    width: 95%;
    border-radius: 5px;
    background: none;
    padding: 5px;
    margin-top: 2px;
`

const TextAreaStyled = styled.textarea`
  background: #383a3f;
    border: none;
  color: white;
  resize: none;
  width: 100%;
  border-radius: 7px;
  padding-left: 15px;
  padding-top: 10px;
  &:focus{
    outline: none;
  }
  
`

const BolvankaKrugTask:React.FC<IBolvankaKrugTaskProps> = ({onKeyDown, onTextAreaChange, task}) => {
  const handleTextAreaChange = (event : React.ChangeEvent<HTMLTextAreaElement>)  =>{
  onTextAreaChange(event.target.value);
}

  return (
    <>
      <DivKrug>
          <TextAreaStyled onChange={handleTextAreaChange} onKeyDown={onKeyDown}  placeholder="Добавить задачу" value={task}>
          </TextAreaStyled>
      </DivKrug>
    </>
  );
};

export default BolvankaKrugTask;