// App.js
import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { MyRoutes } from "./routers/routes";
export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Desloguear al usuario
  };

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container
            className={`${
              sidebarOpen && isAuthenticated ? "sidebarState active" : ""
            } ${isAuthenticated ? "" : "center-login"}`}
            isAuthenticated={isAuthenticated}
          >
            {isAuthenticated && (
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onLogout={handleLogout} // Pasamos la función de logout al Sidebar
              />
            )}
            <MyRoutes
              onLogin={handleAuthentication}
              isAuthenticated={isAuthenticated}
            />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ isAuthenticated }) =>
    isAuthenticated ? "90px auto" : "auto"};
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  height: 100vh;
  justify-content: ${({ isAuthenticated }) =>
    isAuthenticated ? "unset" : "center"};
  align-items: ${({ isAuthenticated }) => (isAuthenticated ? "unset" : "center")};

  &.active {
    grid-template-columns: 300px auto;
  }

  &.center-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  color: ${({ theme }) => theme.text};
`;

export default App;
