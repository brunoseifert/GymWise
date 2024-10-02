import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { formatDate } from "date-fns";
import { Link } from "react-router-dom";
import { getStudentWorkouts, Workout } from "@/services/workoutService";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const WorkoutDay = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      const studentId = user.id;
      const studentWorkouts = await getStudentWorkouts(studentId);
      setWorkouts(studentWorkouts);
    };
    fetchWorkouts();
  }, [user]);

  const currentDate = new Date();
  const formattedDay = formatDate(currentDate, "d", {
    locale: ptBR,
  });
  const formattedMonth = formatDate(currentDate, "MMMM", {
    locale: ptBR,
  });

  return (
    <Sheet>
      <SheetTrigger>
        <Link to="/exercises">
          <div className="min-w-full">
            <Card className="min-w-full bg-secondaryBlack border-grayOne text-white">
              <CardContent className="py-0 flex px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                  {workouts.length > 0 ? (
                    workouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="flex flex-col items-left justify-start gap-2"
                      >
                        <Badge className="bg-primaryPurple text-white p-1 rounded-xl w-fit">
                          {workout.workoutRoutine.title.value}
                        </Badge>
                        <p className="text-sm text-left">{workout.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm">Sem treinos para hoje</p>
                  )}

                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm font-light">
                      <p>Treinador Jonathan</p>
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-grayOne">
                  <p className="text-sm capitalize">{formattedMonth}</p>
                  <p className="text-2xl">{formattedDay}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Link>
      </SheetTrigger>
    </Sheet>
  );
};

export default WorkoutDay;
