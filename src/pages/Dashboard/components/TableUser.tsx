import { getStudentWorkoutsID, Workout } from "@/services/workoutService";
import React, { Suspense, useEffect, useState } from "react";
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
import { Plus, SquarePen, Check, X } from "lucide-react";
import { getAllExercises, Item } from "@/services/exerciseService";
import { useToast } from "@/hooks/use-toast";

interface ExtraSet {
  exercise: string;
  series: number | null;
  reps: number | null;
}

const TableUser = React.memo(({ student }: { student: Student }) => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Item[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extraSets, setExtraSets] = useState<ExtraSet[]>([]);
  const [newExerciseIndex, setNewExerciseIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getAllExercises(1, 96, (options) =>
          toast({
            ...options,
            variant: options.variant as
              | "default"
              | "destructive"
              | null
              | undefined,
          })
        );
        setExercises(data.items);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };

    fetchExercises();
  }, [toast]);

  const handleAddExercise = () => {
    setExtraSets([...extraSets, { exercise: "", series: null, reps: null }]);
    setSelectedExercises([...selectedExercises, ""]);
    setNewExerciseIndex(extraSets.length);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setNewExerciseIndex(null);
  };

  const handleCancelClick = (index: number) => {
    setEditingIndex(null);
    const updatedExtraSets = [...extraSets];
    updatedExtraSets.splice(index, 1);
    setExtraSets(updatedExtraSets);
    setNewExerciseIndex(null);
  };

  const handleConfirmClick = () => {
    setEditingIndex(null);
  };

  if (loading)
    return (
      <div className="max-h-full flex flex-row items-center justify-between">
        <SkeletonCard />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
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

              <div className="w-full gap-2 flex flex-col">
                {workout.sets.map((set, index) => (
                  <div
                    key={index}
                    className="flex gap-6 bg-grayOne p-2 rounded-lg"
                  >
                    <Select disabled={editingIndex !== index}>
                      <SelectTrigger className="w-full bg-transparent border-b-[1px] border-grayThree text-white ">
                        <SelectValue
                          className="border-none"
                          placeholder={set.exercise.name}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="border-none">
                          <SelectLabel>Selecione o exercício</SelectLabel>
                          <SelectItem value="exercise">
                            {set.exercise.name}
                          </SelectItem>
                          {exercises.map((exercise) => (
                            <SelectItem key={exercise.id} value={exercise.id}>
                              {exercise.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      defaultValue={set.series}
                      placeholder="Séries"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white "
                      disabled={editingIndex !== index}
                    />
                    <Input
                      type="number"
                      defaultValue={set.reps}
                      placeholder="Repetições"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white "
                      disabled={editingIndex !== index}
                    />
                    {editingIndex === index ? (
                      <div className="flex items-center gap-2">
                        <Check
                          size={30}
                          className="text-green-500 cursor-pointer"
                          onClick={handleConfirmClick}
                        />
                        <X
                          size={30}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleCancelClick(index)}
                        />
                      </div>
                    ) : (
                      <SquarePen
                        size={40}
                        className="text-white cursor-pointer"
                        onClick={() => handleEditClick(index)}
                      />
                    )}
                  </div>
                ))}

                {/* Adiciona os sets extras dinâmicos */}
                {extraSets.map((extraSet, index) => (
                  <div
                    key={`extra-${index}`}
                    className="flex gap-6 bg-grayOne p-2 rounded-lg"
                  >
                    <Select>
                      <SelectTrigger className="w-full bg-transparent border-b-[1px] border-grayThree text-white">
                        <SelectValue
                          className="border-none"
                          placeholder="Selecione o exercício"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="border-none">
                          <SelectLabel>Selecione o exercício</SelectLabel>
                          {exercises.map((exercise) => (
                            <SelectItem key={exercise.id} value={exercise.name}>
                              {exercise.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* /* Inputs para séries e repetições */}
                    <Input
                      type="number"
                      value={extraSet.series !== null ? extraSet.series : ""}
                      placeholder="Séries"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white"
                      onChange={(e) => {
                        const updatedExtraSets = [...extraSets];
                        updatedExtraSets[index].series = parseInt(
                          e.target.value
                        );
                        setExtraSets(updatedExtraSets);
                      }}
                    />
                    <Input
                      type="number"
                      value={extraSet.reps !== null ? extraSet.reps : ""}
                      placeholder="Repetições"
                      className="w-1/3 bg-transparent border-b-[1px] border-grayThree text-white"
                      onChange={(e) => {
                        const updatedExtraSets = [...extraSets];
                        updatedExtraSets[index].reps = parseInt(e.target.value);
                        setExtraSets(updatedExtraSets);
                      }}
                    />

                    {newExerciseIndex === index ? (
                      <div className="flex items-center gap-2">
                        <Check
                          size={30}
                          className="text-green-500 cursor-pointer"
                          onClick={() => handleCancelClick(index)}
                        />
                        <X
                          size={30}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleCancelClick(index)}
                        />
                      </div>
                    ) : null}
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
          <Button
            className="w-full mt-4 bg-transparent border-[1px] border-grayThree hover:bg-grayOne p-6 flex gap-2"
            onClick={handleAddExercise}
          >
            <Plus />
            Adicionar exercícios
          </Button>
        )}
      </CardFooter>
    </div>
  );
});

export default TableUser;
