import * as React from "react";
import styled from "styled-components";

interface IInputProps{
    ph:string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
    backgroundColor?: string;
}

const Inputt = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #2F3136;
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