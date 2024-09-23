import axios from "axios";

export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/auth/authenticate`,
      {
        email,
        password,
      }
    );

    const { token } = response.data;

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    throw error;
  }
};
