import {
  Bolt,
  CircleGauge,
  Dumbbell,
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
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

const HeaderComponent = () => {
  return (
    <div className="flex flex-row justify-end items-center pt-6 pb-6 ">
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
          <Separator className=" w-full opacity-15" />
          <div className="flex flex-col  text-white p-6">
            <SheetClose>
              <Button
                size="icon"
                variant="outline"
                className="w-full justify-start gap-2 bg-[#26272B]"
              >
                <LogInIcon className="" />
                Login
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
                className="w-full justify-start gap-2 "
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderComponent;
