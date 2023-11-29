import styled from "styled-components";
import Input from "../auth/Input.tsx";
import CloseSVG from "./SVG/CloseSVG.tsx";
import {useEffect, useRef} from "react";

interface IModalProps{
    isShown: boolean,
    title: string,
    closeModal: () => void;
}

const Overlay = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998; 
`

const Wrapper = styled.div`
    position: fixed;
    top: 30%;
    left: 40%;

    width: 350px;
    height: 280px;
    color: #d3d0c8;
    background-color: #383a3f;
    border-radius: 7px;
    z-index: 999; 
`

const UpperBracket = styled.div`

    border-bottom: solid 2px #2f3136;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

    height: 15%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 20px;
`

const LowerBracket = styled.div`
    padding: 20px;
`
const H = styled.h1`
  margin-bottom: 15px;
`
const Modal:React.FC<IModalProps> = ({isShown, title, closeModal}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
    
    return (
        isShown &&
        <>
            <Overlay/>
            <Wrapper ref={modalRef}>
                <UpperBracket>
                    {title}
                    <CloseSVG onClick={closeModal}></CloseSVG>
                </UpperBracket>
                <LowerBracket>
                    <H>Название доски</H>
                    <Input ph={'Введите название доски'} value={''}></Input>
                </LowerBracket>
            </Wrapper> 
        </>

    );
};

export default Modal;