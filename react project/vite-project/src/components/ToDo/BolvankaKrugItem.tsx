import styled from "styled-components";
interface IBolvankaKrugItem{
    textContent:string;
}

const Item = styled.div`
  width: 95%;
  border-radius: 5px;
  color: white;
  background: black;
  padding: 5px;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
`

const CheckBox = styled.input`
  border-radius: 5px;
`

const BolvankaKrugItem:React.FC<IBolvankaKrugItem> = ( {textContent} ) => {
    return (
        <Item>
            {textContent}
            <CheckBox type={"checkbox"}></CheckBox>
        </Item>
    );
};

export default BolvankaKrugItem;