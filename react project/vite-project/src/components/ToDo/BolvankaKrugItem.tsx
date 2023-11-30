import styled from "styled-components";
import { useState } from "react";
import PopUp from "./PopUp";
import axios from "axios";
import { IBolvankaKrugItem } from "../../types/Types";
import { useQueryClient } from "@tanstack/react-query";
import Trash from "./SVG/Trash";

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
  gap: 5px;
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

const BolvankaKrugItem: React.FC<IBolvankaKrugItem> = ({ textContent, id, isCheck, DeleteItem }) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const [inputValue, setInputValue] = useState(textContent);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const UpdateTask = async () => {
    const url = `http://localhost:5661/tasks/${id}`;
    await axios.put(
      url,
      { isCompleted: !isChecked },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    queryClient.invalidateQueries({ queryKey: ['desks'] });
  };

  const openPopUp = () => {
    setPopUpOpen(true);
  };

  const handleCheck = async () => {
    setIsChecked(!isChecked);
    UpdateTask();
  };

  const HandleDeleteItem = () => {
    DeleteToDo(id);
    DeleteItem(id);
  };

  const DeleteToDo = async (id: number) => {
    try {
      const url: string = `http://localhost:5661/tasks/${id}`;
      await axios.delete(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Item isChecked={isChecked} onClick={openPopUp}>
        <div style={{ padding: '7px', width: "80%" }}>{inputValue} </div>
        <CheckBox type={'checkbox'} checked={isChecked} onChange={handleCheck}></CheckBox>
        <Trash onClick = {HandleDeleteItem}></Trash>
      </Item>
      {/* {isPopUpOpen && <PopUp value={inputValue} onChange={handleInputChange} onClick={HandleDeleteItem} onClose={() => setPopUpOpen(false)} />} */}
    </div>
  );
};

export default BolvankaKrugItem;
