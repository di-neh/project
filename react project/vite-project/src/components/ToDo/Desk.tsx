import Bolvanka from "./Bolvanka.tsx";
import AddBtn from "./AddBtn.tsx";
import styled from "styled-components";
import {  useState } from "react";
import axios from "axios";
import {IDeskProps, IGroupData} from "../../types/Types.ts"
import { useQueryClient } from "@tanstack/react-query";
const Conteiner = styled.div`
  display: inline-flex;

  //border: solid 1px red;
  
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  //border: solid 1px blue;
`

const Desk:React.FC<IDeskProps> = ({id, groups}) => {
    
    const [bolvankaData, setBolvankaData] = useState<IGroupData[]>(groups);
    const queryClient = useQueryClient();

    const AddBracket = async () => {
        try {
            const requestData = {
                deskId: id,
                title: "",
            }
            const response:{data: IGroupData} = await axios.post('http://localhost:5661/groups', requestData,
            {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });

            setBolvankaData(prevData => [
                ...prevData,
                {id: response.data.id, title: response.data.title, todos: []}
            ]);
            await queryClient.invalidateQueries({queryKey: ['desks']});
        } catch (e) {
            console.log(e)
        }
    }

    const DeleteComponent = (id:number) => {
        try {
            setBolvankaData(prevData => {
                const updatedData = prevData.filter(item => item.id !== id);
                return updatedData;
            }); 
        } catch (e) {
            console.log(e);
        }
    }

    const UpdateComponent = (id:number, newTitle: string) => {
        try {
            setBolvankaData(prevData => {
                const updatedData = prevData.map(item => {
                  if (item.id === id) {
                    return { ...item, title: newTitle };
                  }

                  return item;
                });
                return updatedData;
              });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Wrapper>
            <Conteiner>
                {bolvankaData.map((item) =>
                    <Bolvanka key = {item.id} title={item.title} id = {item.id} DeleteComponent={DeleteComponent} UpdateComponent={UpdateComponent} tasks={item.todos}/>
                )}
                <AddBtn onClick={AddBracket} />
            </Conteiner>
        </Wrapper>

    );
};

export default Desk;