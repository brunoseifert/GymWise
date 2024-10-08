import {
  Bolt,
  CircleGauge,
  Dumbbell,
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Notification } from "./Notification";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Utilize o contexto de autenticação

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate("/login"); // Navega para a página de login
  };

  const handleLogin = () => {
    navigate("/login"); // Navega para a página de login
  };

  const handleAssessments = () => {
    navigate("/dashboard/assessments");
  };

  return (
    <div className="flex flex-row justify-end items-center pt-6 pb-6">
      <Sheet>
        <Notification />
        <SheetTrigger>
          <Button size="icon" variant="outline">
            <MenuIcon className="text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="text-left text-lg font-semibold text-purple-100 p-6">
            Menu
          </SheetHeader>
          <Separator className="w-full opacity-15" />
          <div className="flex flex-col text-white p-6">
            {user ? (
              <>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="" />
                    Logout
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon className="" />
                    Início
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Dumbbell className="" />
                    Meus Treinos
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon className="" />
                    Meus Planos
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleAssessments}
                  >
                    <LogOutIcon className="" />
                    Minhas avaliações
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <CircleGauge className="" />
                    Progresso
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Bolt className="" />
                    Configurações
                  </Button>
                </SheetClose>
              </>
            ) : (
              <SheetClose>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-full justify-start gap-2 bg-[#26272B]"
                  onClick={handleLogin}
                >
                  <LogInIcon className="" />
                  Login
                </Button>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderComponent;
