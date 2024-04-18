import axios from "axios";

interface Workout {
  id: number;
  name: string;
  description: string;
}

const API_URL = "http://localhost:5099/api/v1";

export const getAllWorkouts = async (): Promise<Workout[]> => {
  try {
    const response = await axios.get(`${API_URL}/workouts`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

export const createWorkout = async (workout: Workout): Promise<Workout> => {
  try {
    const response = await axios.post(`${API_URL}/workouts`, workout);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar treino:", error);
    throw error;
  }
};

export const createWorkoutRoutine = async (
  workoutId: number,
  exerciseId: number
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/workouts/${workoutId}/routines`, {
      exerciseId,
    });
  } catch (error) {
    console.error("Erro ao adicionar exercício ao treino:", error);
    throw error;
  }
};
