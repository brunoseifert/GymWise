import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const timeInMsToShowAlert = 3000;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Usando o contexto de autenticação
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, timeInMsToShowAlert)
  }, [error])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password); // Utilizando a função login do contexto
      navigate("/"); // Redireciona para a página inicial após login bem-sucedido
    } catch (error) {
      console.error("Login error:", error);
      setError("Email ou senha inválidos. Tente novamente!")
    }
  };

  function AlertDestructive() {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ops!</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBlack p-8 rounded-xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-primaryPurple">
            Login
          </h2>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-grayThree  mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-grayOne rounded-xl text-grayThree p-2 w-full focus:outline-none"
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
              className="bg-grayOne rounded-xl text-grayThree p-2 w-full  focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full border text-white p-3 rounded-xl font-medium transition-colors hover:bg-primaryPurpleDark"
          >
            Entrar
          </button>
          {error.length > 0 &&
            <div className="mt-4">
              <AlertDestructive />
            </div>
          }
        </form>
      </div>
    </>
  );
};

export default LoginPage;
