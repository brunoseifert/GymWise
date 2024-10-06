import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ExercisePage from "./pages/Exercise/Exercise";
import RatingPage from "./pages/Rating/Rating";
import DashboardPage from "./pages/Dashboard/page";
import LoginPage from "./pages/login/Login";
import CreateWorkoutPage from "./pages/Dashboard/WorkoutRotine/page";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./contexts/Components/PrivateRoute";
import Assessment from "./pages/Assessment/Assessment";
import Anamnesis from "./pages/Assessment/Anamnesis";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/exercises" element={<ExercisePage />} />
            <Route path="/rating" element={<RatingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/routine" element={<CreateWorkoutPage />} />
            <Route path="/dashboard/assessments" element={<Assessment />} />
            <Route path="/dashboard/assessments/anamnesis" element={<Anamnesis />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
