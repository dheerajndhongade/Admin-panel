import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";

// Create a MUI theme to make it more consistent and customizable
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/edit" element={<CreateEmployee />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
