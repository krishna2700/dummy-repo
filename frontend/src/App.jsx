import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import ReadmePage from "./pages/ReadmePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/readme" element={<ReadmePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Box>
  );
}

export default App;
