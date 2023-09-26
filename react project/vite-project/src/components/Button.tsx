import styled from "styled-components";
import * as React from "react";

interface IButtonProps{
    btnText:string
}
const Butt = styled.button`
  background-color: white;
`
const Button:React.FC<IButtonProps> = ({btnText}) => {
    return (
        <Butt>{btnText}</Butt>

    );
};

export default Button;