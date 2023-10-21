import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";
import { useState } from "react";
import BolvankaKrugItem from "./BolvankaKrugItem.tsx";
import axios from "axios";
import Button from "../auth/Button.tsx";
import { Reorder } from "framer-motion";

const Bulova = styled.div`
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: column; 
`

// const Button = styled.button`
//     border-radius: 5px;
//     background: black;
//     color: white;
//     padding: 3px;
//     margin:2px;
//     width: 48%;
// `

const ButtonsContainer = styled.div`
  margin-top: 10px;
    display: flex;
  justify-content: space-between;
  width: 200px;
`

interface IBolvankaProps{
    title: string,
    id: number;
    DelteComponent: (id:number) => void;
    UpdateComponent: (id:number) => void;
    onPopUpOpen?: () => void;
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
        console.log(value)
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
                <Button btnText = {"Удалить"}  onClick={DeleteHandler}></Button>
                <Button btnText = {"Обновить"}  onClick={UpdateHandler}></Button>
            </ButtonsContainer>
            <BolvankaKrugTitle  onInputChange={HandleBolvankaTitleChange} title={inputTitleValue} />
            <BolvankaKrugTask   onTextAreaChange={HandleBolvankaTaskChange}  onKeyDown={ToDoAdd} task={textAreaTaskValue}/>

            <Reorder.Group axis="y" values={toDoArr} onReorder={setToDoArr}>
                {toDoArr.map((todo) => (
                <Reorder.Item key={todo} value={todo} whileDrag={{scale:1.1}}>
                    
                        <BolvankaKrugItem textContent={todo} />
                
                </Reorder.Item>
                ))}
            </Reorder.Group>
          
        </Bulova>
    );
};

export default Bolvanka;