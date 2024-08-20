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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    setIsLoggedIn(!!userEmail); // Define se o usuário está logado com base na presença do email
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    setIsLoggedIn(false); // Atualiza o estado de autenticação
    navigate("/login"); // Navega para a página de login
  };

  const handleLogin = () => {
    navigate("/login"); // Navega para a página de login
  };

  return (
    <div className="flex flex-row justify-end items-center pt-6 pb-6">
      <Sheet>
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
            {isLoggedIn ? (
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
