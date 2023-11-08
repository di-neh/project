
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoConteiner from "./components/ToDo/ToDoContainer.tsx";
import Profile from "./components/profile/Profile.tsx";
import Global from "./components/auth/Global.tsx";
import AuthPage from "./components/auth/AuthPage.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/main" Component={ToDoConteiner} />
        <Route  path="/auth" Component={AuthPage} />
          <Route  path="/profile" Component={Profile} />
      </Routes>
        <Global></Global>
    </BrowserRouter>
  )
}

export default App
