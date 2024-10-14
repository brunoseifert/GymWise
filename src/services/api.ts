import axios, { AxiosError } from "axios";

export function api(
  toast: (options: {
    title: string;
    description: string;
    variant: string;
  }) => void
) {
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error("Sessão expirada, fazendo logout.");
        toast({
          title: "Erro",
          description: "Sessão expirada, faça login novamente.",
          variant: "destructive",
        });

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
}
