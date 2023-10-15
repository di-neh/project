import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";
import { useState } from "react";
import BolvankaKrugItem from "./BolvankaKrugItem.tsx";
import axios from "axios";


const Bulova = styled.div`
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: column; 
`

const Button = styled.button`
    border-radius: 5px;
    background: black;
    color: white;
    padding: 3px;
    margin:2px;
    width: 48%;
`

const ButtonsContainer = styled.div`
    width: 95%;
`

interface IBolvankaProps{
    title: string,
    id: number;
    DelteComponent: (id:number) => void;
    UpdateComponent: (id:number) => void;
}

const Bolvanka: React.FC<IBolvankaProps> = ({title,  id, DelteComponent, UpdateComponent}) => {



    const ToDoAdd = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();     
          setToDoArr([...toDoArr, textAreaTaskValue]);    
        }
    } 

    const [inputTitleValue, setInputTitleValue] = useState<string>(title);
    const [textAreaTaskValue, setTestAreaTaskValue] = useState<string>("");
    const [toDoArr, setToDoArr] = useState<string[]>([]);

    const HandleBolvankaTitleChange = async (value: string) => {
        setInputTitleValue(value);  
    }

    const HandleBolvankaTaskChange = (value: string) => {
        setTestAreaTaskValue(value); 
    }

    const DeleteHandler = () => {
        DeleteBracket(id);
    }

    const UpdateHandler = () => {
        UpdateBracket(id);
    }


    const UpdateBracket = async (id:number) => {
        try {
            const url:string = 'http://localhost:5661/groups/' + id;
            const response = await axios.put(url, { name: inputTitleValue}, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            UpdateComponent(id);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteBracket = async (id:number) => {
        try {
            const url:string = 'http://localhost:5661/groups/' + id;
            const response = await axios.delete(url, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            DelteComponent(id);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Bulova>
            <ButtonsContainer>
                <Button onClick={DeleteHandler}>delete</Button>
                <Button onClick={UpdateHandler}>update</Button>
            </ButtonsContainer>
            <BolvankaKrugTitle  onInputChange={HandleBolvankaTitleChange} title={inputTitleValue} />
            <BolvankaKrugTask   onTextAreaChange={HandleBolvankaTaskChange}  onKeyDown={ToDoAdd} task={textAreaTaskValue}/>
            {toDoArr.map((todo) => 
                <BolvankaKrugItem textContent={todo}/>
            )}
        </Bulova>
    );
};

export default Bolvanka;