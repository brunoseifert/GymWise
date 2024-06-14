import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterStudents = () => {
  return (
    <div className="py-48 md:py-0  h-[800px] flex-col items-center justify-center md:grid lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primaryPurple">
              Cadastrar Aluno
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os campos abaixo para cadastrar um novo aluno.
            </p>
          </div>
          <div className="m-10 grid gap-6">
            <form>
              <div className="grid gap-2">
                <div className="flex gap-1">
                  <Label className="sr-only">firstName</Label>
                  <Input
                    placeholder="Nome"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <Label className="sr-only">lastName</Label>
                  <Input
                    placeholder="Sobrenome"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only">userName</Label>
                  <Input
                    placeholder="Nome de Usuário"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>{" "}
                <div className="grid gap-1">
                  <Label className="sr-only">Email</Label>
                  <Input
                    placeholder="Email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    name="email"
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex gap-1">
                    <Label className="sr-only">phoneNumber</Label>
                    <Input
                      placeholder="Celular"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    <Label className="sr-only">dateOfBirth</Label>
                    <Input
                      placeholder="Aniversário"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    <Label className="sr-only">document</Label>
                    <Input
                      placeholder="CPF"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </div>
                </div>
                <Button className="bg-primaryPurple/50 hover:bg-primaryPurple/80">
                  Registrar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudents;
