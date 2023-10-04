
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoConteiner from "./components/ToDoConteiner.tsx";
import styled from "styled-components";
import Testicula from "./components/Testicula.tsx";

const AppWrapper = styled.div`
  min-height: 100vh;
  background: #9b9a9a;
`

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route  path="/main" Component={ToDoConteiner} />
        <Route  path="/auth" Component={Testicula} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
