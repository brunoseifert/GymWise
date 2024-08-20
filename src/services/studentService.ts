import axios from "axios";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  dateOfBirth: string;
};

export type StudentsResponse = {
  items: Student[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const getAllStudents = async (): Promise<StudentsResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado no localStorage.");
  }

  try {
    const response = await axios.get<StudentsResponse>(
      `${import.meta.env.VITE_API_URL}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
