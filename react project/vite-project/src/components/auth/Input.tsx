import * as React from "react";
import styled from "styled-components";

interface IInputProps{
    ph:string;
    onChange?: (newValue: string) => void;
    value?: string;
    type?: string;
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
const Input:React.FC<IInputProps> = ({ph}) => {
    return (
            <Inputt placeholder={ph} />
    );
};

export default Input;