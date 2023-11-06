import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import Desk from "./Desk";
import ButtonDesk from "./ButtonDesk";
import { IDeskProps } from "../../types/Types";
import styled from "styled-components";

const ButtonsDeskContainer = styled.div`
    height: 97%;
    width: 90px;
    //border: solid 1px red;
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    background-color: #2b2b2b;
    border-radius: 7px;
    margin-top: 10px;
    margin-inline: 5px;
    margin-bottom: 10px;
`
const Wrapper = styled.div`
    position: absolute;
    height: 93%;
    display: flex;
    flex-direction: row;
    //border: solid 1px green;
`

const ToDoContainer:React.FC = () => {
    useEffect(() => {
        FetchDesks();
    }, []);

    const [currentDesk, setCurrenDesk] = useState<IDeskProps>({groups: [], id: 1, title: '45'});
    const [deskButtons, setDeskButtons] = useState<IDeskProps[]>([]);

    const FetchDesks = async () => {
        try {
            const responce: {data: IDeskProps[]} = await axios.get('http://localhost:5661/desks', {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            console.log(responce.data);
            setCurrenDesk(responce.data[0]);
            setDeskButtons(responce.data);
        } catch (e) {
            console.log(e);
        }
    }

    const AddDesk = async () => {
        try {
            const response:{data:IDeskProps} = await axios.post('http://localhost:5661/desks', {title: "Новая Доска"}, {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            }) 

            setDeskButtons(prevData => [
                ...prevData,
                {...response.data}
            ])
        } catch (e) {
            console.log(e);
        }
    }

    const ButtonHandler = (desk:IDeskProps) =>{
        setCurrenDesk(desk);
    }

    return (
        <div>
            <Header/>
            <Wrapper>
                <ButtonsDeskContainer>
                    {deskButtons.map((deskButton) => 
                        <ButtonDesk desk={deskButton} onClick={ButtonHandler} key={deskButton.id}/>
                    )}
                    <ButtonDesk  title="Добавить доску" addButton={AddDesk}/>
                </ButtonsDeskContainer>
                
                <Desk id={currentDesk.id} key={currentDesk.id} groups={currentDesk.groups} title={currentDesk.title}></Desk>
            </Wrapper>
        </div>
    );
};

export default ToDoContainer;