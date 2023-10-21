import styled from "styled-components";
import { useState } from "react";
import PopUp from "./PopUp";


interface IBolvankaKrugItem{
    textContent:string;
    ChangeComplete?: () => void;
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


const BolvankaKrugItem:React.FC<IBolvankaKrugItem> = ( {textContent } ) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState(textContent);
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked); 
  };  

    

  const openPopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
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
