import styled from "styled-components";
import { useState } from "react";
interface IBolvankaKrugItem{
    textContent:string;
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
  border-radius: 5px;
`


const BolvankaKrugItem:React.FC<IBolvankaKrugItem> = ( {textContent} ) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheck = () => {
    setIsChecked(!isChecked); // Инвертируйте значение isChecked при каждом клике
  };

  return (
      <Item isChecked={isChecked}>
          <div style={{padding:"7px"}}>{textContent}</div>
          <CheckBox type={"checkbox"} checked={isChecked} onChange={handleCheck}></CheckBox>
      </Item>
  );
};

export default BolvankaKrugItem;