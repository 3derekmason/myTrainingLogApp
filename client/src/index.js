import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import App from "./components/App.jsx";

const theme = createMuiTheme({
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
