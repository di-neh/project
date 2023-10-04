import styled from "styled-components";

const DivKrug = styled.div`
    width: 95%;
    border-radius: 5px;
    background: black;
    color: white;
    padding: 5px;
    
`
const Input = styled.input`
  background-color: black;
  width: 100%;
  border: 0px;
  text-align:center;
  color: white;
  &:focus{
    outline: none;
  }
`

interface IBolvankaKrugTitleProps{
    onInputChange : (value: string) => void;
    title?: string
}

const BolvankaKrugTitle:React.FC<IBolvankaKrugTitleProps> = ({ onInputChange, title})  => {

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>)  =>{
        const inputValue = event.target.value;
        onInputChange(inputValue);
    }

    return (
        <>
            <DivKrug>
                <Input onChange={handleInputChange} placeholder="Без названия" value = {title}>

                </Input>
            </DivKrug>
        </>
        
    );
};

export default BolvankaKrugTitle;
