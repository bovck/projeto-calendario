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
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleToken = (token) => setToken(token);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <Header isLoggedIn={token} onLogout={handleLogout} />
      <Routes>
        {/* Se estiver logado, mostra Calendário. Se não, mostra Login */}
        <Route
          path="/"
          element={
            token ? (
              <Calendario token={token} onLogout={handleLogout} />
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
