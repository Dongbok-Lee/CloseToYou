import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ThemeProvider } from "@emotion/react";
import { colors } from "./constants/colors.js";
import { useUserStore } from "./stores/user.jsx";
import { useEffect } from "react";

const App = () => {
  const { isHighContrast } = useUserStore();

  const theme = {
    colors: colors,
    mode: isHighContrast ? 1 : 0,
  };

  useEffect(() => {
    theme.mode = isHighContrast ? 1 : JSON.parse(localStorage.getItem("isHighContrast")) ? 1 : 0;
    if (theme.mode) document.body.classList.add("high-contrast");
    else document.body.classList.remove("high-contrast");
  }, [isHighContrast, localStorage.getItem("isHighContrast")]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
