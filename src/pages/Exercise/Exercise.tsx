import HeaderComponent from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getStudentWorkouts, Workout } from "@/services/workoutService";

const ExercisePage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const studentId = "445c095e-2f3c-4ae8-ae67-95db6fefacff";

  useEffect(() => {
    getStudentWorkouts(studentId).then((data) => setWorkouts(data));
  }, []);

  const extractVideoId = (url: string) => {
    const match = url.match(/youtu\.be\/([^&]+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="container">
      <div className="flex flex-col">
        <div>
          <div className="flex items-center justify-between">
            <Link to="/">
              <ChevronLeft className="text-white" />
            </Link>
            <HeaderComponent />
          </div>
          <img src="" alt="peito" height={300} width={600} />
        </div>

        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="space-y-4">
              <div className="space-y-4">
                <h1 className="text-white">
                  {workout.workoutRoutine.title.value}
                </h1>
                <div className="flex items-center gap-2">
                  <Star className="text-primaryPurple" size={15} />
                  <p className="text-grayThree text-sm">{workout.title}</p>
                </div>
              </div>
              <Separator className="opacity-15 mt-6 mb-6" />
              <div className="flex gap-4 mb-6">
                <Button className="bg-primaryPurple text-white p-2 pl-4 pr-4 rounded-xl">
                  Iniciar
                </Button>
                <Button className="bg-grayOne text-white p-2 rounded-xl">
                  Concluir Treino
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                {workout.sets.map((set) => (
                  <Sheet key={set.id}>
                    <SheetTrigger>
                      <div className="max-w-full mb-4">
                        <Card className="bg-secondaryBlack border-grayOne text-white">
                          <CardContent className="flex flex-col">
                            <div className="flex py-5 ">
                              <YouTube
                                videoId={extractVideoId(set.exercise.urlVideo)}
                                className="w-full h-full"
                                opts={{
                                  width: "100%",
                                  height: "100%",
                                  playerVars: { autoplay: 0 },
                                }}
                              />
                            </div>
                            <div className="grid col-span-2 pl-4">
                              <div className="flex-col items-center text-left">
                                <h2 className="font-bold">
                                  {set.exercise.name}
                                </h2>
                                <p className="text-[12px] font-light text-grayThree">
                                  {set.reps} Repetições, {set.series} Séries
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <Button
                                  className="bg-grayOne text-white w-full"
                                  variant="outline"
                                >
                                  Concluir
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </SheetTrigger>
                  </Sheet>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Nenhum treino encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
