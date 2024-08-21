import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createWorkoutRoutine } from "@/services/workoutRoutineService";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CreateWorkoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");

  const [title, setTitle] = useState("");
  const [observations, setObservations] = useState("");
  const [active, setActive] = useState(true);
  const [inactiveOnExpiration, setInactiveOnExpiration] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (studentId) {
      await createWorkoutRoutine({
        title,
        observations,
        active,
        inactiveOnExpiration,
        startDate,
        expirationDate,
      });

      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-full max-w-lg mx-auto flex flex-col bg-grayOne rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-primaryPurple">
          Criar Rotina
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Título
            </Label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-grayThree p-2 rounded-md"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="observations"
              className="block text-sm font-medium text-white"
            >
              Observações
            </Label>
            <textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="mt-1 block w-full bg-grayThree p-2 rounded-md"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="startDate"
              className="block text-sm font-medium text-white"
            >
              Data de Início
            </Label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full bg-grayThree p-2 rounded-md"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-white"
            >
              Data de Expiração
            </Label>
            <input
              type="date"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="mt-1 block w-full bg-grayThree p-2 rounded-md"
              required
            />
          </div>
          <div className="flex space-x-10">
            <div>
              <Label htmlFor="active" className="flex items-center text-white">
                <input
                  type="checkbox"
                  id="active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="mr-2"
                />
                Ativo
              </Label>
            </div>
            <div>
              <Label
                htmlFor="inactiveOnExpiration"
                className="flex items-center text-white"
              >
                <input
                  type="checkbox"
                  id="inactiveOnExpiration"
                  checked={inactiveOnExpiration}
                  onChange={(e) => setInactiveOnExpiration(e.target.checked)}
                  className="mr-2 "
                />
                Inativo ao Expirar
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className="px-4 w-full py-2 bg-blue-500 text-white"
          >
            Criar Treino
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateWorkoutPage;
