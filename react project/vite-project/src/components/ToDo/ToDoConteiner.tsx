import Bolvanka from "./Bolvanka.tsx";
import AddBtn from "./AddBtn.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.tsx";

const Conteiner = styled.div`
  display: flex;
  flex-direction: row;
  
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

interface IBolvankaData{
    id: number,
    title: string,
}

interface IGroupData{
    id: number,
    name: string,
}

interface IResponseData{
    data: IGroupData[];
}

interface IResponseData2{
    data: IGroupData;
}

const ToDoConteiner:React.FC = () => {
    
    const [bolvankaData, setBolvankaData] = useState<IBolvankaData[]>([]);

    useEffect(() => {
        FetchGroups();
    }, []); 

    const FetchGroups = async () => {
        try {
                const response:IResponseData = await axios.get('http://localhost:5661/groups', {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
                
            setBolvankaData(
                response.data.map(element => ({ id: element.id, title: element.name }))
            );
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const AddBracket = async () => {
        try {
            const response:IResponseData2 = await axios.post('http://localhost:5661/groups', {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });

            setBolvankaData(prevData => [
                ...prevData,
                {id: response.data.id, title: response.data.name}
            ]);
        } catch (e) {
            console.log(e)
        }
    }

    const DelteComponent = (id:number) => {
        try {
            setBolvankaData(prevData => {
                const updatedData = prevData.filter((_, index) => index !== id);
                return updatedData;
            });
            FetchGroups();
            
        } catch (e) {
            console.log(e);
        }
    }

    const UpdateComponent = (id:number) => {
        try {
            setBolvankaData(prevData => {
                const updatedData = prevData.filter((_, index) => index !== id);
                return updatedData;
            });
            FetchGroups();
        } catch (e) {
            console.log(e);
        }
    }

   

    return (
        <Wrapper>
            <Header></Header>
       
            <Conteiner >
                {bolvankaData.map((item) =>  
                <Bolvanka key = {item.id} title={item.title}  id = {item.id} DelteComponent={DelteComponent} UpdateComponent={UpdateComponent}/>)}
                <AddBtn onClick={AddBracket} />
                
            </Conteiner>
        </Wrapper>

    );
};

export default ToDoConteiner;