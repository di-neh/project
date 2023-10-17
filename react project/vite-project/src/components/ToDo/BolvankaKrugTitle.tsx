import styled from "styled-components";
import Input from "../auth/Input.tsx";


const DivKrug = styled.div`
    width: 95%;
    border-radius: 5px;
    background: none;
    color: white;
    padding: 5px;
    
`


interface IBolvankaKrugTitleProps{
    onInputChange : (value: string) => void;
    title: string
}

const BolvankaKrugTitle:React.FC<IBolvankaKrugTitleProps> = ({ onInputChange, title})  => {

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>)  =>{
        const inputValue = event.target.value;
        onInputChange(inputValue);
    }

    return (
        <>
            <DivKrug>
                <Input backgroundColor={'#383a3f'} onChange={handleInputChange} ph="Без названия" value = {title}></Input>
            </DivKrug>
        </>
    );
};

export default BolvankaKrugTitle;
