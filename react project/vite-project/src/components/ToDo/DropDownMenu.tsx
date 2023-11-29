import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import SVGDotsMenu from "./SVG/SVGDotsMenu.tsx";

export interface DropdownMenuProps {
    id: number;
    onDelte: (id:number) => void;
    onUpdate: (id:number) => void;
}


const SVGcontainer = styled.div`
  position: relative;
  top: 4px;
  width: 40px;
  height: 40px;
  z-index: 10;
  right: 40px;
`

const MenuContainer = styled.div`
    width: 200px;
    background-color: #2b2b2b;
    color: #d3d0c8;
    position: absolute;

    z-index: 3;

    border: none;
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



const DropDownMenu:React.FC<DropdownMenuProps> = ({id, onDelte, onUpdate}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);


    const handleDelete = () => {
        onDelte(id);
        setIsOpen(false);
      };
    
      const handleUpdate = () => {
        onUpdate(id);
        setIsOpen(false);
      };
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
      
    return (
        <div>
            <SVGcontainer>
                <SVGDotsMenu onClick={() => {setIsOpen(!isOpen)}}/>
            </SVGcontainer>
            {isOpen && (     
                <MenuContainer ref={modalRef}>
                    <MenuItem onClick={handleUpdate}>Обновить</MenuItem>
                    <MenuItem onClick={handleDelete}>Удалить</MenuItem>
                </MenuContainer>
            )}
        </div>
    );
};

export default DropDownMenu;