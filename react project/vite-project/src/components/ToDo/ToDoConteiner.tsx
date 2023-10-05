import Bolvanka from "./Bolvanka.tsx";
import AddBtn from "./AddBtn.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";


const Conteiner = styled.div`
  display: flex;
  flex-direction: row;
  
`

interface IBolvankaData{
    id: number,
    title: string,

}

const ToDoConteiner:React.FC = () => {
    
    const [bolvankaData, setBolvankaData] = useState<IBolvankaData[]>([]);

    useEffect(() => {
        FetchGroups();
    }, []); 

    const FetchGroups = async () => {
        // const response = await axios.get('http://localhost:5661/groups', {
        //     headers : {'Content-Type': 'application/json'},
        //     withCredentials: true
        // });

        // response.data.forEach(element => {
        //     setBolvankaData([...bolvankaData, {id: element.id, title: element.name}])
        // });

        // console.log(response.data);
        // console.log(bolvankaData);
        try {
            const response = await axios.get('http://localhost:5661/groups', {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
    
            setBolvankaData(prevData => [
                ...prevData,
                ...response.data.map(element => ({ id: element.id, title: element.name }))
            ]);
    
            console.log('Response data:', response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const AddBracket = () => {
        setBolvankaData([...bolvankaData, {id: 14, title: ''}])
    }

    return (
        <Conteiner>
            {bolvankaData.map((item) => 
                <Bolvanka key = {item.id} title={item.title}  />
            )}
            <AddBtn onClick={AddBracket} />
        </Conteiner>
    );
};

export default ToDoConteiner;