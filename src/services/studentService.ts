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
  try {
    const response = await axios.get(`${API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw error;
  }
};
