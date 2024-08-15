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

const API_URL = "http://localhost:5099/api/v1/exercises";

export const getAllExercises = async (): Promise<PageApp> => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    throw error;
  }
};
