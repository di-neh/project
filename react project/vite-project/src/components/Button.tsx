import styled from "styled-components";
import * as React from "react";

interface IButtonProps{
    btnText:string
    onClick?: () => void;
}
const Butt = styled.button`
  background-color: white;
`
const Button:React.FC<IButtonProps> = ({btnText, onClick}) => {
    return (
        <Butt onClick={onClick}>{btnText}</Butt>

    );
};

export default Button;