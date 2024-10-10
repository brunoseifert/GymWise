import axios, { AxiosResponse } from "axios";
import { PagedList } from "./Common/Interfaces/PagedList";
import { date } from "zod";

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
  studentId: string,
  answered: boolean
): Promise<PagedList<Anamnesis> | undefined> => {
  try {
    const response: AxiosResponse<PagedList<Anamnesis>> = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/students/${studentId}/anamnesis?answered=${answered}`
    );

    return response?.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

export interface AnswerAnamnesisQuestion {
  anamnesisId: string
  answerItems: AnswerItem[]
}

export interface AnswerItem {
  questionnaireId: string
  answer: string
}

export interface AnswerAnamnesisResult {
  id: string
  title: string
  questions: string[]
}


export const answerAnamnesis = async (
  studentId: string,
  data: AnswerAnamnesisQuestion
): Promise<AxiosResponse<AnswerAnamnesisResult> | undefined> => {
  try {
    const response: AxiosResponse<AnswerAnamnesisResult> = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/students/${studentId}/anamnesis-answer`, data
    );

    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
