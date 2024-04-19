import { formatDate } from "date-fns";
import HeaderComponent from "./components/Header";
import { Separator } from "./components/ui/separator";
import { ptBR } from "date-fns/locale/pt-BR";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Search } from "lucide-react";
import WorkoutDay from "./components/WokoutDay";
import WorkoutNextItem from "./components/WorkoutNext";

const Home = () => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, "d 'de' MMMM", {
    locale: ptBR,
  });
  const formatteDay = formatDate(currentDate, "EEE", { locale: ptBR });

  return (
    <div>
      <HeaderComponent />
      <div className="container flex flex-col">
        <Separator className="opacity-15" />

        <div className=" text-purple-50 pt-6 pb-6">
          <h1 className="text-xl font-light">
            Olá!, <strong>Bruno!</strong>
          </h1>
          <p className="text-sm font-light">
            <span className="capitalize">{formatteDay}</span>, {formattedDate}
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            className="bg-secondaryBlack border-[px] border-grayOne placeholder-grayThree text-grayThree rounded-xl"
            type="search"
            placeholder="Buscar"
          />
          <Button className="bg-primaryPurple text-white p-2 rounded-xl">
            <Search size={20} />
          </Button>
        </div>

        <h4 className="uppercase text-grayThree text-xs mt-12 mb-4 ml-1">
          Seu treino de Hoje
        </h4>
        <WorkoutDay />

        <h4 className="uppercase text-grayThree text-xs mt-6 mb-4 ml-1">
          próximos treinos
        </h4>

        <WorkoutNextItem />
      </div>
    </div>
  );
};

export default Home;
