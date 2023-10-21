import styled from 'styled-components';
import { useState } from 'react';
import Trash from './SVG/Trash';

interface MenuProps {
    active?: boolean;
    onClick?: () => void;
    complete?: boolean;
}

const Wrapper = styled.div<MenuProps>`
    display:${(props) => (props.active ? 'flex':'none')};
    position: absolute;
    width: 500px;
    height: 100%;
    right: 0;
    top: 0;
    background: #9C9C9C;
    border-radius: 10px;
    
`

const Header = styled.div`
    position: absolute;
    width: 100%;
    height: 7%;
    background: #9C9C9C;
    border-radius: 10px;
    border: 1px solid black;

`

const Butt = styled.button`
    position: absolute;
    top: 12px;
    right: 6px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border: 3px solid black;
    border-radius: 50%;
`

const ItemComplete = styled.div<MenuProps>`
    position: absolute;
    width: 100px;
    height: 23px;
    top: 70px;
    left: 20px;
    background: ${(props) => (props.complete ? '#3AFA00' : '#9C9C9C')};
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
`

const Start = styled.div`
    position: absolute;
    width: 100px;
    height: 23px;
    top: 70px;
    left: 130px;
    background: #9C9C9C;
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
`

const ItemValue = styled.textarea<MenuProps>`
    position: absolute;
    width: 460px;
    height: auto;
    top: 130px;
    left: 20px;
    background: #9C9C9C;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 24px; 
    overflow: hidden; 
`

const PopUp = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {

    const [active, setActive] = useState(true);
    const [itemText, setItemText] = useState('Выполнить');
    const [complete, setComplete] = useState(false);

    const offBtn = () =>{
        setActive(!active);
    }


    const ChangeComplete = () =>{
        setComplete(!complete);
        if (complete) {
            setItemText('Выполнить');
        } else {
            setItemText('Выполнена');
            
        }
    }
    

    return (
        <Wrapper active={active}>
            <Header>
                <Trash/>
                <Butt onClick={offBtn}>✖</Butt>
            </Header>   

            <ItemComplete complete={complete} onClick={ChangeComplete}>{itemText}</ItemComplete>  
            <Start>Старт</Start> 
            <ItemValue value={value} onChange={onChange}></ItemValue>          
        </Wrapper>   
    );
};

export default PopUp;