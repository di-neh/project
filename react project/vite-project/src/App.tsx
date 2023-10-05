
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoConteiner from "./components/ToDo/ToDoConteiner.tsx";
// import styled from "styled-components";
import Testicula from "./components/auth/Testicula.tsx";

// const AppWrapper = styled.div`
//   min-height: 100vh;
//   background: #9b9a9a;
// `

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
