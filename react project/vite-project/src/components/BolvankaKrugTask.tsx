
import { useState } from "react";
import styled from "styled-components";

const DivKrug = styled.div`
    width: 95%;
    border-radius: 5px;
    background: black;
    padding: 5px;
    margin-top: 2px;
`

const TextAreaStyled = styled.textarea`
    background: black;
    border: none;
  color: white;
  resize: none;
  width: 100%;
  text-align:center;
  &:focus{
    outline: none;
  }
  
`

interface IBolvankaKrugTaskProps{
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; 
  onTextAreaChange: (value: string) => void;
  task?: string;
}

const BolvankaKrugTask:React.FC<IBolvankaKrugTaskProps> = ({onKeyDown, onTextAreaChange, task}) => {
  
  const[textAreaValue, setTextAreaValue] = useState<string>(task === undefined ? "" : task);

  const handleTextAreaChange = (event : React.ChangeEvent<HTMLTextAreaElement>)  =>{
  setTextAreaValue(event.target.value);
  onTextAreaChange(event.target.value);
}

  return (
    <>
      <DivKrug>
          <TextAreaStyled onChange={handleTextAreaChange} onKeyDown={onKeyDown}  placeholder="Добавить задачу" value={textAreaValue}>
          </TextAreaStyled>
      </DivKrug>
    </>
  );
};

export default BolvankaKrugTask;