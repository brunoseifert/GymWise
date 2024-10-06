import axios, { AxiosResponse } from "axios";
import { PagedList } from "./Common/Interfaces/PagedList";

export interface Anamnesis {
  id: string
  title: string
  questionnare: Questionnare[]
}

export interface Questionnare {
  id: string
  question: string
  answer?: string | null
  createdOnUtc: string
  updatedOnUtc: string
}

export const getAnamnesisByStudentId = async (
  studentId: string
): Promise<PagedList<Anamnesis> | undefined> => {
  try {
    const response: AxiosResponse<PagedList<Anamnesis>> = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/students/${studentId}/anamnesis`
    );

    return response?.data;
  } catch (error) {
      console.error(JSON.stringify(error));   
  }
};
