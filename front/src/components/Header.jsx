import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>Calendário</h1>
        </Link>
        <nav className="header-nav">
          {!isLoggedIn ? (
            <>
              {/* Se NÃO estiver logado */}
              <Link to="/" className="header-button login">
                Entrar
              </Link>
              <Link to="/signup" className="header-button signup">
                Cadastrar
              </Link>
            </>
          ) : (
            <>
              {/* Se estiver logado */}
              <button className="header-button login" onClick={onLogout}>
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
