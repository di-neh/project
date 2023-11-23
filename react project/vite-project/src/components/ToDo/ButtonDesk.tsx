import styled from "styled-components";
import { IDeskProps } from "../../types/Types";

interface IButtonProps{
    desk?: IDeskProps,
    title?: string,
    onClick?: (desk: IDeskProps) => void,
    addButton?: () => void,
}

const Button = styled.button`
    background-color: #6C78F4;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 7px;
    color: white;
    width: 100%;
    //padding: 10px;
    cursor: pointer;
`

const ButtonDesk:React.FC<IButtonProps> = ({desk, onClick, title, addButton}) => {

    const OnClickHandler = () => {
        if(desk && onClick)
            onClick(desk);
        if(addButton)
            addButton();
        console.log( addButton === undefined)
    }

    return (
        <Button onClick={OnClickHandler}>
            {desk? desk.title : title}
        </Button>
    );
};

export default ButtonDesk;