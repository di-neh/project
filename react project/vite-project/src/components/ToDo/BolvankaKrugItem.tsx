import styled from "styled-components";
interface IBolvankaKrugItem{
    textContent:string;
}

const Item = styled.div`
  width: 250px;
  border-radius: 5px;
  color: white;
  background: #383a3f;
  padding: 5px;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  word-break: break-all;
`

const CheckBox = styled.input`
  border-radius: 5px;
`

const BolvankaKrugItem:React.FC<IBolvankaKrugItem> = ( {textContent} ) => {
    return (
        <Item>
            <div style={{padding:"7px"}}>{textContent}</div>
            <CheckBox type={"checkbox"}></CheckBox>
        </Item>
    );
};

export default BolvankaKrugItem;