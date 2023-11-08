import styled from "styled-components";
import Input from "../auth/Input.tsx";
import { IBolvankaKrugTitleProps } from "../../types/Types.ts";

const DivKrug = styled.div`
    width: 260px;
    border-radius: 5px;
    background: none;
    color: white;
    padding: 5px;
    display: flex;
    flex-direction: row;
  margin-left: 40px;

   // border: solid 1px green;
`

const BolvankaKrugTitle:React.FC<IBolvankaKrugTitleProps> = ({ onInputChange, title})  => {

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>)  =>{
        const inputValue = event.target.value;
        onInputChange(inputValue);
    }

    return (
        <>
            <DivKrug>
                <Input  backgroundColor={'#383a3f'} onChange={handleInputChange} ph="Без названия" value = {title}></Input>
            </DivKrug>
        </>
    );
};

export default BolvankaKrugTitle;
