import axios from "axios";

const API_URL = "http://localhost:5099/api/v1";

export const authenticateUser = async (): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      email: "user@example.com",
      password: "string",
    });

    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    throw error;
  }
};
