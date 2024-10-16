import axios from "axios";

export interface Exercise {
  name: string;
  urlVideo: string;
  createdOnUtc: Date;
  isDeleted: boolean;
  id: string;
}

export interface Set {
  reps: number;
  series: number;
  intervalsInSeconds: number;
  createdOnUtc: Date;
  isDeleted: boolean;
  exerciseId: string;
  exercise: Exercise;
  id: string;
}

export interface Title {
  value: string;
}

export interface WorkoutRoutine {
  studentId: string;
  title: Title;
  active: boolean;
  inactiveOnExpiration: boolean;
  startDate: Date;
  expirationDate: Date;
  createdOnUtc: Date;
  workouts: null[];
  isDeleted: boolean;
  id: string;
}

export interface Workout {
  title: string;
  createdOnUtc: Date;
  isDeleted: boolean;
  workoutRoutineId: string;
  workoutRoutine: WorkoutRoutine;
  sets: Set[];
  id: string;
}

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/workouts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

export const getStudentWorkoutsID = async (
  studentId: string
): Promise<Workout[]> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/workouts/student/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    if (typeof data === "string" && data.trim() === "") {
      return [];
    }

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Erro ao buscar treinos do aluno:", error);
    throw error;
  }
};
