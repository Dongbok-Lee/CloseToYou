import { Routes, Route } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import LandingPage from "./pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout page={<LandingPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
