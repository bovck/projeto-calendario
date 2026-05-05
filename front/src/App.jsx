import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Calendario from "./components/Calendario.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  // Estado que controla se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  const handleToken = (token) => setToken(token);

  // const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Se estiver logado, mostra Calendário. Se não, mostra Login */}
        <Route
          path="/"
          element={
            token ? (
              <Calendario token={token} />
            ) : (
              <Login onToken={handleToken} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        {/* Redireciona qualquer outra rota para a home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
