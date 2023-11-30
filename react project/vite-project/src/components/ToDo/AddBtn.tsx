import styled from "styled-components";
import Button from "../auth/Button.tsx";

const Add = styled.div`
  margin-top: 30px;
  
`
interface IAddBtnProps{
    onClick: ()=> void;
}



const AddBtn: React.FC<IAddBtnProps> = ({onClick}) => {



    const OnclickHandler = async () => {
        onClick();

    }

    return (
        <Add>
            <Button btnText={"Добавить"} onClick={OnclickHandler}></Button>
        </Add>

    );
};

export default AddBtn;