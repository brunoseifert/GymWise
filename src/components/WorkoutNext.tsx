import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Sheet, SheetTrigger } from "./ui/sheet";

export const workouts = [
  {
    title: "Treino  B",
    image: "/images/peito.png",
    bodyPart: "Posteriores",
  },
  {
    title: "Treino de C",
    image: "/images/pernas.png",
    bodyPart: "Costas",
  },

  {
    title: "Treino de D",
    image: "/images/ombro.png",
    bodyPart: "Ombro",
  },

  {
    title: "Treino de E",
    image: "/images/peito.png",
    bodyPart: "Biceps e Triceps",
  },
];

const WorkoutNextItem = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex w-max space-x-4 pb-4">
        {workouts.map((workout, index) => (
          <Sheet key={index}>
            <SheetTrigger>
              <div className="max-w-fit">
                <Card className="max-w-fit bg-secondaryBlack border-grayOne text-white p-4">
                  <CardContent className="py-0 flex flex-col px-0">
                    <div className="flex flex-col py-5">
                      <img
                        src={workout.image}
                        width={140}
                        height={110}
                        alt={workout.title}
                      />
                      <h2 className="font-bold text-left">{workout.title}</h2>
                      <div className="flex items-center">
                        <p className="text-[12px] font-light text-grayThree">
                          {workout.bodyPart}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                      <Button className="w-full bg-grayOne" variant="outline">
                        Ver Treino
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetTrigger>
          </Sheet>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default WorkoutNextItem;
