import styled from "styled-components";

const DivKrug = styled.div`
    width: 300px;
    border-radius: 5px;
    background: black;
    color: white;
    padding: 5px;
    margin-bottom: 10px;
`

const BolvankaKrugTitle:React.FC = () => {
    return (
        <>
            <DivKrug>
                <input>

                </input>
            </DivKrug>
        </>
        
    );
};

export default BolvankaKrugTitle;