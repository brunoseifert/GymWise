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
import { useAuth } from "@/contexts/AuthContext";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const ExercisePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      const studentId = user.id;
      const studentWorkouts = await getStudentWorkouts(studentId);
      setWorkouts(studentWorkouts);
    };
    fetchWorkouts();
  }, [user]);

  //timer

  const startTimer = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
      setTimer(0);
    }
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  //cronometro

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive]);

  //formatar tempo

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleCompleteSet = (setId: string) => {
    if (!isTimerActive) {
      return;
    }
    setCompletedSets((prev) => new Set(prev).add(setId));
  };

  const handleCompleteWorkout = () => {
    if (
      completedSets.size <
      workouts.reduce((sum, workout) => sum + workout.sets.length, 0)
    ) {
      toast({
        title: "Treino incompleto!",
        description: "Complete todos os exercícios antes de concluir o treino.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      return;
    }
    toast({
      variant: "default",
      title: "Treino concluído!",
      description: "Parabéns, você concluiu o treino com sucesso.",
      action: <ToastAction altText="Ok">Ok</ToastAction>,
    });
    completedSets.clear();
    stopTimer();
  };

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

          <img
            src="https://www.dicasdetreino.com.br/wp-content/uploads/2017/12/Treino-de-Peito-Criando-Peitorais-Gigantes.jpg"
            alt="peito"
            height={300}
            style={{ objectFit: "cover" }}
          />
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
              <div className="flex gap-4 mb-6 items-center">
                <Button
                  onClick={startTimer}
                  className="bg-primaryPurple text-white p-2 pl-4 pr-4 rounded-xl"
                >
                  Iniciar
                </Button>
                {isTimerActive && (
                  <Button
                    onClick={handleCompleteWorkout}
                    className="text-white p-2 rounded-xl"
                    variant="conclusion"
                  >
                    Concluir Treino
                  </Button>
                )}
                {isTimerActive && (
                  <div className="text-white text-xl">{formatTime(timer)}</div>
                )}
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
                                {isTimerActive ? (
                                  completedSets.has(set.id) ? (
                                    <Button
                                      className="w-full text-white p-2 rounded-xl"
                                      onClick={() => handleCompleteSet(set.id)}
                                      variant="conclusion"
                                    >
                                      Exercício Concluído
                                    </Button>
                                  ) : (
                                    <Button
                                      className="bg-grayOne w-full text-white p-2 rounded-xl"
                                      onClick={() => handleCompleteSet(set.id)}
                                      variant="conclusion"
                                    >
                                      Concluir
                                    </Button>
                                  )
                                ) : (
                                  <Button
                                    className="bg-grayOne w-full text-white p-2 rounded-xl"
                                    variant="conclusion"
                                    onClick={() => {
                                      toast({
                                        title: "Treino não iniciado!",
                                        description:
                                          "Inicie o treino para concluir os exercícios.",
                                        action: (
                                          <ToastAction altText="Ok">
                                            Ok
                                          </ToastAction>
                                        ),
                                      });
                                    }}
                                  >
                                    Concluir
                                  </Button>
                                )}
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
