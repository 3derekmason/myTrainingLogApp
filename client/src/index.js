import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import App from "./components/App.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5d4037",
    },
    secondary: {
      main: "#bf360c",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
