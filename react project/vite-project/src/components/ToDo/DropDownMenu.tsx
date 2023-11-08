import { useState } from "react";
import styled from "styled-components";
import SVGDotsMenu from "./SVG/SVGDotsMenu.tsx";

interface DropdownMenuProps {
    onDelete: () => void;
    onUpdate: () => void;
}

const SVGcontainer = styled.div`
  position: relative;
  right: 40px;
  top: 4px;
    width: 40px;
    height: 40px;
    z-index: 10;
`

const MenuContainer = styled.div`
    width: 200px;
    background-color: #2b2b2b;

    position: absolute;
    
    z-index: 3;

    border: solid 0px black;
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
    color: #d3d0c8;
    text-align: center;
    

    cursor: pointer;
`

const DropDownMenu:React.FC<DropdownMenuProps> = ({onDelete, onUpdate}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        onDelete();
        setIsOpen(false);
      };
    
      const handleUpdate = () => {
        onUpdate();
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