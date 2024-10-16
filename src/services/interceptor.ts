// import { AxiosError } from "axios";
// import { api } from "./api";

// let isRefreshing = false;
// let failedRequestQueue: FailedRequest[] = [];

// interface ErrorResponse {
//   code?: string;
// }

// interface FailedRequest {
//   onSuccess: (token: string) => void;
//   onFailure: (error: AxiosError) => void;
// }

// const AxiosInterceptor = () => {
//   const apiInstance = api();

//   apiInstance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       // Verifica se houve um erro de autenticação e se o código de erro é "Token has expired"
//       const originalConfig = error.config;

//       if (
//         error.response?.status === 401 &&
//         (error.response.data as ErrorResponse)?.code === "Token has expired"
//       ) {
//         if (originalConfig) {
//           const refreshToken = localStorage.getItem("refreshToken");

//           if (refreshToken) {
//             if (!isRefreshing) {
//               isRefreshing = true;

//               try {
//                 const response = await apiInstance.post("/v1/auth/refresh", {
//                   refreshToken,
//                 });

//                 const { token, refreshToken: newRefreshToken } = response.data;
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("refreshToken", newRefreshToken);

//                 originalConfig.headers["Authorization"] = `Bearer ${token}`;

//                 failedRequestQueue.forEach((request) =>
//                   request.onSuccess(token)
//                 );
//                 failedRequestQueue = [];
//               } catch (err) {
//                 failedRequestQueue.forEach((request) =>
//                   request.onFailure(err as AxiosError)
//                 );
//                 failedRequestQueue = [];
//                 return Promise.reject(err);
//               } finally {
//                 isRefreshing = false;
//               }
//             }

//             return new Promise((resolve, reject) => {
//               failedRequestQueue.push({
//                 onSuccess: (token: string) => {
//                   originalConfig.headers["Authorization"] = `Bearer ${token}`;
//                   resolve(apiInstance(originalConfig));
//                 },
//                 onFailure: (err: AxiosError) => {
//                   reject(err);
//                 },
//               });
//             });
//           }
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// };

// export default AxiosInterceptor;
