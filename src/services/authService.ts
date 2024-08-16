import axios from "axios";

const API_URL = "http://localhost:5099/api/v1";

export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    throw error;
  }
};

export const manualTokenSetup = () => {
  const manualToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3R1ZGVudCIsImp0aSI6InRlc3RlQGdtYWlsLmNvbSIsInN1YiI6IjU3NzliYmFjLWM5OTAtNDAzNy1iYzQ5LTI1MTE0MzM4NmNkOCIsIm5iZiI6MTcyMzgzNTI0MywiZXhwIjoxNzIzODY0MDQzLCJpYXQiOjE3MjM4MzUyNDMsImlzcyI6Ikd5bVdpc2UiLCJhdWQiOiJHeW1XaXNlIn0.d7mVCzanGtaQgCyUEOUWGRe_6Zcreg6BP0Pfbu8bcO0";

  // Remover qualquer token existente
  localStorage.removeItem("token");

  // Configurar o novo token manualmente
  localStorage.setItem("token", manualToken);
  console.log("Token manual configurado:", manualToken);

  // Definindo manualmente o userId no sessionStorage
  const manualUserId = "5779bbac-c990-4037-bc49-251143386cd8";
  sessionStorage.setItem("userId", manualUserId);

  return manualToken;
};
