import { getStudentWorkoutsID, Workout } from "@/services/workoutService";
import { Suspense, useEffect, useState } from "react";
import { SkeletonCard } from "./Skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Student } from "@/services/studentService";

const TableUser = ({ student }: { student: Student }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts: Workout[] = await getStudentWorkoutsID(
          student.id
        );
        setWorkouts(fetchedWorkouts);
      } catch (error) {
        setError("Erro ao buscar treinos.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [student.id]);

  if (loading)
    return (
      <div className="max-h-full flex flex-row items-center justify-between">
        <SkeletonCard />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      {" "}
      <Suspense fallback={loading}>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col space-y-2 w-full h-full"
            >
              <Label
                htmlFor="workout"
                className="p-6 w-40 items-center mt-4 rounded-xl border-grayThree  border-[1px] text-white"
              >
                {workout.title}
              </Label>

              <div className="w-full  gap-2 flex flex-col">
                {workout.sets.map((set, index) => (
                  <div
                    key={index}
                    className="flex gap-6 bg-grayOne p-2 rounded-lg"
                  >
                    <Select>
                      <SelectTrigger className="w-full bg-transparent border-b-[1px] border-grayThree text-white ">
                        <SelectValue
                          className="border-none"
                          placeholder={set.exercise.name}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="border-none">
                          <SelectLabel>Selecione o exercício</SelectLabel>
                          <SelectItem value="exercise ">
                            {set.exercise.name}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      defaultValue={set.series}
                      placeholder="Séries"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white "
                    />
                    <Input
                      type="number"
                      defaultValue={set.reps}
                      placeholder="Repetições"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white "
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            <Label htmlFor="name">Nome da rotina</Label>
            <Input id="name" placeholder="Ex: Treino A, B, etc." />
          </div>
        )}
      </Suspense>
      <CardFooter>
        {workouts.length === 0 ? (
          <Button onClick={() => console.log("Criar nova rotina")}>
            Criar nova rotina
          </Button>
        ) : (
          <Button className="w-full mt-4 bg-transparent border-[1px] border-grayThree">
            Adicionar exercícios
          </Button>
        )}
      </CardFooter>
    </div>
  );
};

export default TableUser;
