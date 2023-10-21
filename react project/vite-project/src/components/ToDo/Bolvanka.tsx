import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";
import { useState } from "react";
import BolvankaKrugItem from "./BolvankaKrugItem.tsx";
import axios from "axios";
import Button from "../auth/Button.tsx";
import { Reorder } from "framer-motion";
import { IToDoData } from "../../../types/ToDo.ts";


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
    tasks: IToDoData[];
    DelteComponent: (id:number) => void;
    UpdateComponent: (id:number) => void;
    onPopUpOpen?: () => void;
}



const Bolvanka: React.FC<IBolvankaProps> = ({title,  id, DelteComponent, UpdateComponent, tasks}) => {

    const [inputTitleValue, setInputTitleValue] = useState<string>(title);
    const [textAreaTaskValue, setTestAreaTaskValue] = useState<string>("");
    const [toDoArr, setToDoArr] = useState<IToDoData[]>(tasks);



    const ToDoAddHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();     
          ToDoAdd(id);
        }
    } 

    const ToDoAdd = async (id:number) => {
        try {
            const data : IToDoData = {
                description: "",
                title: textAreaTaskValue,
                iscompleted: false,
                group_id: id,
            }

            const responce = await axios.post('http://localhost:5661/tasks', data, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            const todo:IToDoData = responce.data;
            setToDoArr(prevData => [
                ...prevData,
                {description:todo.description, iscompleted:todo.iscompleted, title:todo.title, id: todo.id}
            ])
            setTestAreaTaskValue("");
        } catch (e) {
            console.log(e);
        }
    }

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
            //const response = 
            await axios.put(url, { name: inputTitleValue}, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            UpdateComponent(id);
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteBracket = async (id:number) => {
        try {
            const url:string = 'http://localhost:5661/groups/' + id;
            //const response = 
            await axios.delete(url, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            DelteComponent(id);
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

            <BolvankaKrugTask   onTextAreaChange={HandleBolvankaTaskChange}  onKeyDown={ToDoAddHandler} task={textAreaTaskValue}/>
            {toDoArr.map((todo) => 
                <BolvankaKrugItem key = {todo.id} textContent={todo.title} id={todo.id? todo.id: 0} isCheck = {todo.isCompleted}/>
            )}
        </Bulova>
    );
};

export default Bolvanka;