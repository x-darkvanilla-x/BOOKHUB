import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { Stack, Typography } from "@mui/material";
import { Copyright, Favorite } from "@mui/icons-material";
import Home from "./Home";
import Books from "./Books";
import Bookmarks from "./Bookmarks";
import { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home setSearchValue={setSearchValue} />} />
          <Route path="/books" element={<Books search={searchValue} />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
        <Stack
          sx={{
            alignItems: "center",
            padding: "20px",
            color: "black",
            textAlign: "center",
            bgcolor: "#f2f2f2",
            marginTop: "auto", // This will push the footer to the bottom
          }}
        >
          <Typography variant="body1">
            <Copyright fontSize="inherit" /> 2024, This Website is made with{" "}
            <Favorite fontSize="inherit" sx={{ color: "red" }} /> by Dipesh
            Adelkar
          </Typography>
        </Stack>
      </Router>
    </div>
  );
}

export default App;
