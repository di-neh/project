import styled from "styled-components";

interface IModalProps{
    isShown: boolean,
    title: string,
    closeModal: () => void;
}

const Overlay = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998; 
`

const Wrapper = styled.div`
    position: fixed;
    top: 30%;
    left: 40%;

    width: 350px;
    height: 280px;

    background-color: #383a3f;
    border-radius: 7px;
    z-index: 999; 
`

const UpperBracket = styled.div`

    border-bottom: solid 2px #2f3136;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

    height: 15%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding-inline: 5px;
`

const LowerBracket = styled.div`
    
`

const Modal:React.FC<IModalProps> = ({isShown, title, closeModal}) => {

    return (
        isShown &&
        <>
            <Overlay/>
            <Wrapper>
                <UpperBracket>
                    {title}
                    <button onClick={closeModal}>закрыть</button>
                </UpperBracket>
                <LowerBracket>
                    CONTENT
                </LowerBracket>
            </Wrapper> 
        </>

    );
};

export default Modal;