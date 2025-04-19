import { Button } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        {/* //{ nav bar} */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
