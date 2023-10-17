import styled from "styled-components";
import * as React from "react";

interface IButtonProps{
    btnText?:string
    onClick?: () => void;
}
const Butt = styled.button`
  background-color: #b9b9ae;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 7px;
  color: black;
  padding: 10px;
  cursor: grab;
`
const Button:React.FC<IButtonProps> = ({btnText, onClick}) => {
    return (
        <Butt onClick={onClick}>{btnText}</Butt>
    );
};

export default Button;