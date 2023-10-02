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
// interface Input {
//     inputValue: string; // Тип значения из поля ввода
// }
const BolvankaKrugTitle:React.FC = () => {
    // constructor(props: {}) {
    //     super(props);
    //     this.state = {
    //         inputValue: '' // Исходное значение поля ввода
    //     };
    // }
    //
    // handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         inputValue: event.target.value // Обновляем значение поля ввода при изменении
    //     });
    // }
    return (
        <>
            <DivKrug>
                <Input placeholder="Название задачи">

                </Input>
            </DivKrug>
        </>
        
    );
};

export default BolvankaKrugTitle;