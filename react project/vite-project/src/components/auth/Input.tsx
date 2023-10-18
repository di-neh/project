import * as React from "react";
import styled from "styled-components";

interface IInputProps{
    ph:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
    backgroundColor?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Inputt = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #2f3136;
  color: #ddd;
  border: 0px;
  height: 40px;
  padding-left: 15px;
  &:focus{
    outline: none;
  }
`
const Input:React.FC<IInputProps> = ({ph, type, value, onKeyDown, onChange, backgroundColor}) => {
    const componentStyle = {
        backgroundColor: backgroundColor,
        // Другие стили компонента
    };
    return (
      <Inputt placeholder={ph} onKeyDown={onKeyDown} type={type} value={value} onChange={onChange} style={componentStyle}/>
    );
};

export default Input;