import "./App.css";
import {RegistrationPage} from "./components/routes/registration/registrationPage.jsx";
import {TodoMain} from "./components/routes/todo/todoMain.jsx";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/routes/login/loginPage.jsx";


function App() {
    return (
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/registration" element={<RegistrationPage />}></Route>
                <Route path="/todo" element={<TodoMain />}></Route>
            </Routes>
        )
}

export default App;