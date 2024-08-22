import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Usando o contexto de autenticação
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password); // Utilizando a função login do contexto
      navigate("/"); // Redireciona para a página inicial após login bem-sucedido
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondaryBlack text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-grayOne p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-primaryPurple">
          Login
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-grayThree mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-secondaryBlack border border-grayThree rounded-xl text-grayThree p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-grayThree mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="bg-secondaryBlack border border-grayThree rounded-xl text-grayThree p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primaryPurple text-white p-3 rounded-xl font-medium transition-colors hover:bg-primaryPurpleDark"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
