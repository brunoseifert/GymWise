import axios from "axios";

export interface WorkoutRoutine {
  title: string;
  observations: string;
  active: boolean;
  inactiveOnExpiration: boolean;
  startDate: string;
  expirationDate: string;
  studentId: string;
}

const studentId = import.meta.env.VITE_STUDENT_ID;

export const createWorkoutRoutine = async (
  workoutData: Omit<WorkoutRoutine, "studentId">
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/workouts/rotines`,
      {
        ...workoutData,
        studentId,
      }
    );

    if (response.status === 204) {
      console.log("Treino criado com sucesso");
    } else {
      console.log("Erro ao criar o treino", response.data);
    }
  } catch (error) {
    console.error("Erro ao criar o treino:", error);
  }
};
