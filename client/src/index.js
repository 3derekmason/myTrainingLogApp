import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import App from "./components/App.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C7C64",
    },
    secondary: {
      main: "#517AAC",
    },
    warning: {
      main: "#9C6C58",
    },
    cards: {
      main: "#ededdd",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
