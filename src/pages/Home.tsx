import React from "react";
import { format as formatDate } from "date-fns";
import HeaderComponent from "../components/Header";
import { Separator } from "../components/ui/separator";
import { ptBR } from "date-fns/locale/pt-BR";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import WorkoutDay from "../components/WokoutDay";
import WorkoutNextItem from "../components/WorkoutNext";
import RatingItem from "../components/Rating";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, "d 'de' MMMM", {
    locale: ptBR,
  });
  const formattedDay = formatDate(currentDate, "EEE", { locale: ptBR });

  return (
    <div>
      <div className="container flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-grayThree">
            <span className="text-primaryPurple uppercase">Gym </span>
            Wise
          </h1>
          <HeaderComponent />
        </div>
        <Separator className="opacity-15" />

        <div className="text-white pt-6 pb-6">
          <div>{user ? `Olá, ${user.email}` : "Faça login!"}</div>
          <p className="text-sm font-light">
            <span className="capitalize">{formattedDay}</span> {formattedDate}
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
          Próximos treinos
        </h4>
        <WorkoutNextItem />

        <h4 className="uppercase text-grayThree text-xs mt-6 mb-4 ml-1">
          Avaliações
        </h4>
        <RatingItem />
      </div>
    </div>
  );
};

export default Home;
