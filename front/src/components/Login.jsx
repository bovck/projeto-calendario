import { useState } from "react";
import "./Login.css";

export default function Login({ onToken }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorData, setErrorData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Tentativa de Login (Dados):", JSON.stringify(formData));
    const res = await fetch("http://localhost:8080/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.status === 404) {
      setErrorData(data.message);
    }

    if (!data.userId) {
      setErrorData(data.message);
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      onToken(data.token);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bem-vindo</h2>
        <p className="login-subtitle">
          Entre na sua conta para ver o calendário
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          {errorData && <div className="error">{errorData}</div>}

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
