import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ExercisePage from "./pages/Exercise/Exercise";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<ExercisePage />} />
      </Routes>
    </Router>
  );
};

export default App;
