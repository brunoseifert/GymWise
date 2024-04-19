import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { formatDate } from "date-fns";

const WorkoutDay = () => {
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
        <div className="min-w-full">
          <Card className="min-w-full bg-secondaryBlack border-grayOne text-white">
            <CardContent className="py-0 flex px-0">
              <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                <Badge className="w-fit relative -left-1.5 bg-darkPurple text-primaryPurple">
                  Treino A
                </Badge>
                <h2 className="font-bold text-left">Peito</h2>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm font-light">
                    <p>Treinador Jhonathan</p>
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
      </SheetTrigger>
    </Sheet>
  );
};

export default WorkoutDay;
