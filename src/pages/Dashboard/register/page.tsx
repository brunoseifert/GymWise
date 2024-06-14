import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";

const RegisterStudents = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    document: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adjustedFormData = {
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    };

    console.log(adjustedFormData);
    try {
      const response = await fetch(
        "http://localhost:5099/api/v1/students/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustedFormData),
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error("Falha ao registrar aluno");
      }
      console.log("Aluno registrado com sucesso");
    } catch (error) {
      console.error("Erro ao registrar aluno:", error);
    }
  };

  return (
    <div className="py-52 md:py-0 h-[800px] flex-col items-center justify-center md:grid lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primaryPurple">
              Cadastrar Aluno
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os campos abaixo para cadastrar um novo aluno.
            </p>
          </div>
          <div className="m-10 grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="flex gap-1">
                  <Label className="sr-only">firstName</Label>
                  <Input
                    name="firstName"
                    placeholder="Nome"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                  <Label className="sr-only">lastName</Label>
                  <Input
                    name="lastName"
                    placeholder="Sobrenome"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only">userName</Label>
                  <Input
                    name="userName"
                    placeholder="Nome de Usuário"
                    autoCapitalize="none"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={formData.userName}
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
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex gap-1">
                    <Label className="sr-only">phoneNumber</Label>
                    <Input
                      name="phoneNumber"
                      placeholder="Celular"
                      autoCapitalize="none"
                      autoCorrect="off"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                    />
                    <Label className="sr-only">dateOfBirth</Label>
                    <Input
                      name="dateOfBirth"
                      placeholder="Aniversário"
                      autoCapitalize="none"
                      autoCorrect="off"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                    />
                    <Label className="sr-only">document</Label>
                    <Input
                      placeholder="CPF"
                      autoCapitalize="none"
                      autoCorrect="off"
                      name="document"
                      onChange={handleChange}
                      value={formData.document}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-primaryPurple/50 hover:bg-primaryPurple/80"
                >
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
