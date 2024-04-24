import HeaderComponent from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Item, getAllExercises } from "@/controllers/exerciseController";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const ExercisePage = () => {
  const [workouts, setWorkouts] = useState<Item[]>([]);

  useEffect(() => {
    getAllExercises().then((data) => setWorkouts(data.items));
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

        <div className="space-y-4">
          <h1 className="text-white ">Treino A</h1>
          <div className="flex items-center gap-2">
            <Star className="text-primaryPurple" size={15} />
            <p className="text-grayThree text-sm">Treino de Peito</p>
          </div>
        </div>
        <Separator className="opacity-15 mt-6 mb-6" />
        <div className="flex gap-4 mb-6 ">
          <Button className="bg-primaryPurple text-white p-2 pl-4 pr-4 rounded-xl">
            Iniciar
          </Button>

          <Button className="bg-grayOne text-white p-2 rounded-xl">
            Concluir Treino
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {workouts.map((workout, index) => (
            <Sheet key={index}>
              <SheetTrigger>
                <div className="max-w-full ">
                  <Card className="bg-secondaryBlack border-grayOne text-white ">
                    <CardContent className="grid grid-cols-3 p-2">
                      <div className="flex py-5">
                        <YouTube
                          videoId={extractVideoId(workout.urlVideo)}
                          opts={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <div className="grid col-span-2 pl-4">
                        <div className="flex-col items-center text-left">
                          <h2 className="font-bold">{workout.name}</h2>
                          <p className="text-[12px] font-light text-grayThree">
                            {workout.name}
                          </p>
                        </div>
                        <div className="flex items-center w-full justify-between">
                          <p className="text-primaryPurple font-semibold">
                            10 Repetições
                          </p>
                          <Button
                            className=" bg-grayOne items-center"
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
    </div>
  );
};

export default ExercisePage;
