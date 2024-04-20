import HeaderComponent from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ExercisePage = () => {
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
        <div className="flex gap-4 ">
          <Button className="bg-primaryPurple text-white p-2 pl-4 pr-4 rounded-xl">
            Iniciar
          </Button>

          <Button className="bg-grayOne text-white p-2 rounded-xl">
            Concluir Treino
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
