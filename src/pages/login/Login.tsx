import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5099/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.token; // Supondo que o token seja retornado na resposta
      sessionStorage.setItem("token", token); // Armazena o token
      navigate("/"); // Redireciona o usuário para a página inicial
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
