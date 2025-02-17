import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { createTheme} from "@mui/material/styles"
import Summary from "./pages/Summary";
import { Toaster } from "react-hot-toast";
function App() {
  const theme = useMemo(() => createTheme(themeSettings(),[]));
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary" element={<Summary/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
