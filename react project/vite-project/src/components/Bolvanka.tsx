import styled from "styled-components";
import BolvankaKrugTitle from "./BolvankaKrugTitle.tsx";
import BolvankaKrugTask from "./BolvankaKrugTask.tsx";

const Bulova = styled.div`
  width: 275px;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  
`

const Bolvanka = () => {
    return (
        <Bulova>
            <BolvankaKrugTitle/>
            <BolvankaKrugTask/>
        </Bulova>
    );
};

export default Bolvanka;