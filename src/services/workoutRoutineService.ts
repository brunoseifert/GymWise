import axios, { AxiosResponse } from "axios";

export interface WorkoutRoutine {
  title: string;
  observations: string;
  active: boolean;
  inactiveOnExpiration: boolean;
  startDate: string;
  expirationDate: string;
}

export const createWorkoutRoutine = async (
  workoutData: WorkoutRoutine,
  studentId: string
): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/workouts/rotines`,
      {
        ...workoutData,
        studentId,
      }
    );

    if (response.status === 204) {
      console.log("Treino criado com sucesso");
    } else {
      console.error(
        "Erro ao criar o treino:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao criar o treino:", error.message || error);
    } else {
      console.error("Erro inesperado:", error);
    }
  }
};
