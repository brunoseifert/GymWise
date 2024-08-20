import axios from "axios";

export interface PageApp {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Item[];
}

export interface Item {
  name: string;
  urlVideo: string;
  createdOnUtc: Date;
  updatedOnUtc: null;
  isDeleted: boolean;
  deletedOnUtc: null;
  id: string;
}

export const getAllExercises = async (): Promise<PageApp> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    throw error;
  }
};
