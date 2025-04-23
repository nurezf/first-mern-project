import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
