import styled from "styled-components";

const DivKrug = styled.div`
    width: 95%;
    border-radius: 5px;
    background: black;
    padding: 5px;
  margin-top: 2px;

    
  
`

const TextAreaStyled = styled.textarea`
    background: black;
    border: none;
  color: white;
  resize: none;
  width: 100%;
  text-align:center;
  &:focus{
    outline: none;
  }
  
`

const BolvankaKrugTask:React.FC = () => {
    return (
        <>
            <DivKrug>
                <TextAreaStyled placeholder="Добавить задачу">

                </TextAreaStyled>
            </DivKrug>
        </>
        
    );
};

export default BolvankaKrugTask;