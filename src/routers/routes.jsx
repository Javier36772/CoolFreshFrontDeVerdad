// MyRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Estadisticas } from "../pages/Estadisticas";
import { Productos } from "../pages/Productos";
import { Diagramas } from "../pages/Diagramas";
import { Alertas } from "../pages/Alertas";
import { Tabla } from "../pages/Tabla"

export function MyRoutes({ onLogin, isAuthenticated }) {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={onLogin} />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
      <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/" />} />
      <Route path="/estadisticas" element={isAuthenticated ? <Estadisticas /> : <Navigate to="/" />} />
      <Route path="/diagramas" element={isAuthenticated ? <Diagramas /> : <Navigate to="/" />} />
      <Route path="/alertas" element={isAuthenticated ? <Alertas /> : <Navigate to="/" />} />
      <Route path="/tabla" element={isAuthenticated ? <Tabla /> : <Navigate to="/" />} /> {/* Nueva ruta */}
    </Routes>
  );
}
