import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ThemeProvider } from "@emotion/react";
import { colors } from "./constants/colors.js";

const theme = {
  colors: colors,
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
