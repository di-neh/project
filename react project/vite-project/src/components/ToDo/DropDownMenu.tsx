import { useState } from "react";
import styled from "styled-components";
import SVGDotsMenu from "./SVG/SVGDotsMenu.tsx";

interface DropdownMenuProps {
    onDelete: (id:number) => void;
    onUpdate: (id:number) => void;
    id: number;
}

const SVGcontainer = styled.div`
    width: 40px;
    height: 40px;
`

const MenuContainer = styled.div`
    width: 200px;
    background-color: #2b2b2b;

    position: absolute;
    z-index: 3;

    border: solid 1px black;
    border-radius: 7px;

    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 3px;
`

const MenuItem = styled.div`
    background-color: #2b2b2b;

    border-radius: 7px;

    height: 20px;
    width:100%;

    text-align: center;

    cursor: pointer;
`

const DropDownMenu:React.FC<DropdownMenuProps> = ({onDelete, onUpdate, id}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        onDelete(id);
        setIsOpen(false);
      };
    
      const handleUpdate = () => {
        onUpdate(id);
        setIsOpen(false);
      };
      
    return (
        <div>
            <SVGcontainer>
                <SVGDotsMenu onClick={() => {setIsOpen(!isOpen)}}/>
            </SVGcontainer>
            {isOpen && (     
                <MenuContainer>
                    <MenuItem onClick={handleUpdate}>Обновить</MenuItem>
                    <MenuItem onClick={handleDelete}>Удалить</MenuItem>
                </MenuContainer>
            )}
      </div>
    );
};

export default DropDownMenu;