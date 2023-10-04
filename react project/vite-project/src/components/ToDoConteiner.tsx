import Bolvanka from "./Bolvanka.tsx";
import AddBtn from "./AddBtn.tsx";
import styled from "styled-components";
import { useState } from "react";


const Conteiner = styled.div`
  display: flex;
  flex-direction: row;
  
`

interface IBolvankaData{
    id: number,
    title: string,
    task:string
}

const ToDoConteiner:React.FC = () => {
    
    const [bolvankaData, setBolvankaData] = useState<IBolvankaData[]>([
        {id: 0, title: 'Bracket1', task: ''},
        {id: 1, title: 'Bracket2', task: ''},
        {id: 2, title: 'Bracket3', task: ''}
    ])

    const AddBracket = () => {
        setBolvankaData([...bolvankaData, {id: 14, title: '', task: ''}])
    }

    return (
        <Conteiner>
            {bolvankaData.map((item) => 
                <Bolvanka key = {item.id} title={item.title} task={item.task} />
            )}
            <AddBtn onClick={AddBracket} />
        </Conteiner>
    );
};

export default ToDoConteiner;