import axios from "axios";

const API_URL = "http://localhost:5099/api/v1";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  dateOfBirth: string;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const token = localStorage.getItem("token");
  console.log("Token obtido:", token);

  if (!token) {
    throw new Error("Token não encontrado no localStorage.");
  }

  try {
    const response = await axios.get(`${API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Resposta da API:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao buscar alunos:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};
