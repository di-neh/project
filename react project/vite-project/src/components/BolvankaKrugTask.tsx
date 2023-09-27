import styled from "styled-components";

const DivKrug = styled.div`
    width: 300px;
    border-radius: 5px;
    background: black;
    color: white;
    padding: 5px;
    margin-bottom: 10px;
`

const TextAreaStyled = styled.textarea`
    background: black;
    border: solid 0px;
`

const BolvankaKrugTask:React.FC = () => {
    return (
        <>
            <DivKrug>
                <TextAreaStyled >

                </TextAreaStyled>
            </DivKrug>
        </>
        
    );
};

export default BolvankaKrugTask;