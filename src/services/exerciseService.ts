import { api } from "./api";

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

export const getAllExercises = async (
  pageNumber: number = 1,
  pageSize: number = 96,
  toast: (options: {
    title: string;
    description: string;
    variant: string;
  }) => void
): Promise<PageApp> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api(toast).get("/v1/exercises", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    throw error;
  }
};
