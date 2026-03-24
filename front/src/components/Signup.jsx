import { useState } from "react";
import "./Login.css"; // Reuse login styles if they exist or I'll create them

export default function Signup() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    alert("Cadastro realizado (simulado)!");
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

          <button type="submit" className="login-button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
