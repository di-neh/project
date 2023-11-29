
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoConteiner from "./components/ToDo/ToDoContainer.tsx";
import Profile from "./components/profile/Profile.tsx";
import Global from "./components/auth/Global.tsx";
import AuthPage from "./components/auth/AuthPage.tsx";
import Admin from "./components/admin/Admin.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/main" Component={ToDoConteiner} />
        <Route  path="/auth" Component={AuthPage} />
        <Route  path="/profile" Component={Profile} />
        <Route  path="/admin" Component={Admin} />
      </Routes>
        <Global></Global>
    </BrowserRouter>
  )
}

export default App
