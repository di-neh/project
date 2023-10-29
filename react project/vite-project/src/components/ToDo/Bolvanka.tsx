import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";
import { useState } from "react";
import BolvankaKrugItem from "./BolvankaKrugItem.tsx";
import axios from "axios";
import Button from "../auth/Button.tsx";
import { IBolvankaProps, IToDoData } from "../../types/Types.ts";
import {Reorder} from "framer-motion";

const Bulova = styled.div`
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: column; 
`

const ButtonsContainer = styled.div`
  margin-top: 10px;
    display: flex;
  justify-content: space-between;
  width: 200px;
`



const Bolvanka: React.FC<IBolvankaProps> = ({title,  id, DeleteComponent, UpdateComponent, tasks}) => {

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
                isCompleted: false,
                group_id: id,
            }

            const responce = await axios.post('http://localhost:5661/tasks', data, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            const todo:IToDoData = responce.data;
            setToDoArr(prevData => [
                ...prevData,
                {description:todo.description, isCompleted:todo.isCompleted , title:todo.title, id: todo.id}
            ])
            setTestAreaTaskValue("");
        } catch (e) {
            console.error(e);
        }
    }

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
            //const response = 
            await axios.put(url, { name: inputTitleValue}, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            UpdateComponent(id);
        } catch (e) {
            console.error(e);
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
            DeleteComponent(id);
        } catch (e) {
            console.error(e);
        }
    }

    const deleteTask = (id: number) => {
        setToDoArr((prevData) => prevData.filter((todo) => todo.id !== id));
    };

    return (
        
        <Bulova>
            <ButtonsContainer>
                <Button btnText = {"Удалить"}  onClick={DeleteHandler}></Button>
                <Button btnText = {"Обновить"}  onClick={UpdateHandler}></Button>
            </ButtonsContainer>
            <BolvankaKrugTitle  onInputChange={HandleBolvankaTitleChange} title={inputTitleValue} />

            <BolvankaKrugTask   onTextAreaChange={HandleBolvankaTaskChange}  onKeyDown={ToDoAddHandler} task={textAreaTaskValue}/>
            <Reorder.Group axis="y" values={tasks} onReorder={setToDoArr}>
            {toDoArr.map((todo) => 
                <Reorder.Item value={todo}>
                    <BolvankaKrugItem DeleteItem={deleteTask} tasks={toDoArr}  key = {todo.id} textContent={todo.title} id={todo.id? todo.id: 0} isCheck = {todo.isCompleted}/>
                </Reorder.Item>
            )}
            </Reorder.Group>
        </Bulova>
        
        
    );
};

export default Bolvanka;