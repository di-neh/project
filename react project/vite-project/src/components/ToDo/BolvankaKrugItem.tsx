import styled from "styled-components";
import { useState } from "react";
import PopUp from "./PopUp";
import axios from "axios";

interface IBolvankaKrugItem{
    textContent:string;
    id: number;
    isCheck: boolean;
}

interface ItemProps {
  isChecked: boolean;
}

const Item = styled.div<ItemProps>`
  width: 250px;
  border-radius: 5px;
  color: white;
  background: #383a3f;
  padding: 5px;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  word-break: break-all;
  text-decoration: ${(props) => (props.isChecked ? 'line-through' : 'none')};
  text-decoration-color: red;
`

const CheckBox = styled.input`
  position: relative;
  border-radius: 5px;
  top: 0%;
  right: 1%;
`



const BolvankaKrugItem: React.FC<IBolvankaKrugItem> = ( {textContent, id, isCheck} ) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const [inputValue, setInputValue] = useState(textContent);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const UpdateTask = async() => {
    const url = `http://localhost:5661/tasks/${id}`;
    //const response = 
    await axios.put(url, {isCompleted: !isChecked}, {
      headers: {'Content-Type' : 'application/json'},
      withCredentials: true
    });

  }
  
  const openPopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };
  
  const handleCheck = async () => {
    setIsChecked(!isChecked);
    UpdateTask();

  };

  return (
    <div>
      {/* {isPopUpOpen && <PopUp value={inputValue} onChange={handleInputChange}/>} */}
      <Item isChecked={isChecked} onClick={openPopUp}>
          <div style={{padding:"7px"}} >{inputValue} </div>
          <CheckBox type={"checkbox"} checked={isChecked} onChange={handleCheck}></CheckBox>
      </Item>
      
    </div>
  );
};
export default BolvankaKrugItem;
