import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";
import { useState } from "react";
import BolvankaKrugItem from "./BolvankaKrugItem.tsx";


const Bulova = styled.div`
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: column; 
`

interface IBolvankaProps{
    title: string,
    task: string
}

const Bolvanka: React.FC<IBolvankaProps> = ({title, task}) => {

    const ToDoAdd = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();     
          setToDoArr([...toDoArr, testAreaTaskValue]);    
        }
    } 

    const [inputTitleValue, setInputTitleValue] = useState<string>(title);
    const [testAreaTaskValue, setTestAreaTaskValue] = useState<string>(task);
    const [toDoArr, setToDoArr] = useState<string[]>([]);

    const HandleBolvankaTitleChange = (value: string) => {
        setInputTitleValue(value);  
    }

    const HandleBolvankaTaskChange = (value: string) => {
        setTestAreaTaskValue(value); 
    }

    return (
        <Bulova>
            <BolvankaKrugTitle  onInputChange={HandleBolvankaTitleChange} title={inputTitleValue} />
            <BolvankaKrugTask onTextAreaChange={HandleBolvankaTaskChange}  onKeyDown={ToDoAdd} task={testAreaTaskValue}/>
            {toDoArr.map((todo) => 
                <BolvankaKrugItem textContent={todo}/>
            )}

        </Bulova>
    );
};

export default Bolvanka;