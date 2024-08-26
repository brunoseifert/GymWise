import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MenuIcon, LogInIcon, Dumbbell, Bolt, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "./components/DataTable";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import RegisterStudents from "./register/page";

const DashboardPage = () => {
  return (
    <div className=" flex flex-col relative">
      <div className="flex py-4 justify-between px-4">
        <div className="flex space-x-4 text-white">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-col ">
            <h1>Treinador Bruno</h1>
            <span className="opacity-50">bruno@gmail.com</span>
          </div>
        </div>
        <div>
          {" "}
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
                    className="w-full justify-start gap-2 bg-[#26272B] px-2"
                  >
                    <LogInIcon className="" />
                    Login
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2 px-2"
                  >
                    <User2Icon className="" />
                    Alunos
                  </Button>
                </SheetClose>
                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2 px-2"
                  >
                    <Dumbbell className="" />
                    Exercícios
                  </Button>
                </SheetClose>

                <SheetClose>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-full justify-start gap-2 px-2"
                  >
                    <Bolt className="" />
                    Configurações
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator className=" w-full opacity-15" />
      <div className="flex justify-between p-4 container">
        <span className="text-primaryPurple text-3xl ">Dashboard</span>

        <Dialog>
          <DialogTrigger>
            <Button
              variant="outline"
              className="bg-primaryPurple text-white p-2 pl-4 pr-4 rounded-xl ml-auto"
            >
              Cadastrar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-secondaryBlack border-none text-white">
            <DialogHeader>
              <DialogTitle>Cadastrar novo aluno</DialogTitle>
              <DialogDescription>Insira os dados dele aqui</DialogDescription>
            </DialogHeader>
            <RegisterStudents />
          </DialogContent>
        </Dialog>
      </div>

      <div className="px-4 ">
        <DataTableDemo />
      </div>
    </div>
  );
};

export default DashboardPage;
