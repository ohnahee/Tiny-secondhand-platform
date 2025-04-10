import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage.tsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
