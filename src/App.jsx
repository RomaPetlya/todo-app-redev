import "./App.css";
import {RegistrationPage} from "./pages/RegistrationPage/registrationPage.jsx";
import {TodoPage} from "./pages/TodoPage/todoPage.jsx";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/loginPage.jsx";
import {Navigate} from "react-router-dom";


function App() {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/registration" element={<RegistrationPage />}></Route>
                <Route path="/todo" element={<TodoPage />}></Route>
            </Routes>
        )
}

export default App;