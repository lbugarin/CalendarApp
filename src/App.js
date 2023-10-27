import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Calendar from "./Components/Calendar";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <Calendar />
      </div>
    </ThemeProvider>
  );
}

export default App;
