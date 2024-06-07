import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ExercisePage from "./pages/Exercise/Exercise";
import RatingPage from "./pages/Rating/Rating";
import DashboardPage from "./pages/Dashboard/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
