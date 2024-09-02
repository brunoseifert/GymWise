import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/services/studentService";

const UserProfile = ({ student }: { student: Student }) => {
  return (
    <div>
      <aside className=" w-56 flex flex-col bg-secondaryBlack border-2  border-grayOne rounded-lg p-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-40 h-40">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Badge className="text-xl bg-primaryPurple">
            {student.firstName} {student.lastName}
          </Badge>
          <Separator className="w-full opacity-15" />
        </div>
        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-grayThree">Email</Label>
            <p>{student.email}</p>
          </div>
          <div>
            <Label className="text-grayThree">Celular</Label>
            <p>{student.cellPhone}</p>
          </div>
          <div className="flex flex-col">
            <Label className="text-grayThree">Endereço</Label>
            <p>Rua do comercio</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-grayThree">Plano</Label>
            <Badge className="bg-primaryPurple w-fit">Mensal</Badge>
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-grayThree">Situação</Label>
            <Badge className="bg-Red w-fit">Inativo</Badge>
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-grayThree">Progresso</Label>
            <Progress value={42} className="" />
          </div>
        </div>
        <Button className="mt-4 w-full bg-primaryPurple">Editar Dados</Button>
      </aside>
    </div>
  );
};

export default UserProfile;
