import { useEffect, useState } from "react";
import Header from "./Header";
import Desk from "./Desk";
import ButtonDesk from "./ButtonDesk";
import { IDeskProps } from "../../types/Types";
import styled from "styled-components";
import DropDownMenu from "./DropDownMenu";
import Modal from "./Modal";
import { useDesks } from "../../Hooks/useDesks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deskService from "../../services/desk.service";

const ButtonsDeskContainer = styled.div`
    height: 97%;
    width: 180px;

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


const ButtonDropDownContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const ToDoContainer:React.FC = () => {



    const {data} = useDesks();

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deskService.Delete(id),
        mutationKey: ['delete desk'],
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['desks']});
            if(data != undefined)
                setCurrenDesk(data[0]);
        }
    })

    const [currentDesk, setCurrenDesk] = useState<IDeskProps>({groups: [], id: 1, title: '45'});
    const [pageLoaded, setPageLoaded] = useState(false);
    const [isModalShow, setIsModalShow] = useState<boolean>(false);
    
    useEffect(() => {
        if (data && data.length > 0 && !pageLoaded) {
          setCurrenDesk(data[0]);
          setPageLoaded(true);
        }
    }, [data, pageLoaded]);

    const ButtonHandler = (desk:IDeskProps) =>{
        setCurrenDesk(desk);
    }


    const onDelete = (id: number) => {
        deleteMutation.mutate(id);
    }


    return (
        <div>
            <Header/>
            <Wrapper>
                <ButtonsDeskContainer>
                    {data?.length && data.map((deskButton) => 

                        <ButtonDropDownContainer>
                            <ButtonDesk desk={deskButton} onClick={ButtonHandler} key={deskButton.id} isAddBtn = {false}/>
                            <div style={{position:"relative", left:"40px"}}>
                                <DropDownMenu onDelte={onDelete} onUpdate={() => console.log('net')} key={deskButton.id} id={deskButton.id}/>
                            </div>

                        </ButtonDropDownContainer>
                    )}
                    <ButtonDesk  title="Добавить доску" isAddBtn = {true}/>
                    <Modal isShown = {isModalShow} title="TEST" closeModal={() => {setIsModalShow(false)}}></Modal>

                </ButtonsDeskContainer>
                
                <Desk id={currentDesk.id} key={currentDesk.id} groups={currentDesk.groups} title={currentDesk.title}></Desk>
            </Wrapper>
        </div>
    );
};

export default ToDoContainer;