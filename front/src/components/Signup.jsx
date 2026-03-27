import { useState } from "react";
import "./Login.css"; // Reuse login styles if they exist or I'll create them

export default function Signup() {
  const [formData, setFormData] = useState({
    nome: "",
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
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 200) {
      setFormData({
        nome: "",
        email: "",
        password: "",
      });
    }
    if (res.status === 500) {
      setErrorData(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Criar Conta</h2>
        <p className="login-subtitle">Preencha os dados abaixo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">Nome Completo</label>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

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
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
