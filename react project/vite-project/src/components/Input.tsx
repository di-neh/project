import * as React from "react";
import styled from "styled-components";

interface IInputProps{
    ph:string
}

const Inputt = styled.input`
  width: 300px;
  margin-bottom: 10px;
`
const Input:React.FC<IInputProps> = ({ph}) => {
    return (
            <Inputt placeholder={ph}/>
    );
};

export default Input;