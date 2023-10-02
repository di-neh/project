
import ToDoConteiner from "./components/ToDoConteiner.tsx";
import styled from "styled-components";

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #9b9a9a;
`

function App() {

  return (
    <AppWrapper>
      <ToDoConteiner/>
    </AppWrapper>
  )
}

export default App
