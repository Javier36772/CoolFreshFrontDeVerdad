import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validar las credenciales
    if (username === "admin" && password === "12345") {
      onLogin(); // Llamar a la función onLogin para autenticar al usuario
      navigate("/home"); // Redirigir a la vista de Home después del login
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div
      style={{
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#1e3c72" }}>
          Bienvenido a CoolFresh!
        </h2>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", fontSize: "16px", marginBottom: "8px" }}>
            Usuario:
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              boxSizing: "border-box",
            }}
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", fontSize: "16px", marginBottom: "8px" }}>
            Contraseña:
          </label>
          <input
            type="Contraseña:"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              boxSizing: "border-box",
            }}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p style={{ color: "#ff4d4d", fontSize: "14px", marginBottom: "15px" }}>
            {error}
          </p>
        )}
        <button
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#1e3c72",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={handleLogin}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2a5298")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e3c72")}
        >
          Ingresar
        </button>
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          <p>
            <a
              href="/forgot-password"
              style={{
                color: "#1e3c72",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
            </a>
          </p>
          <p>
            <a
              href="/sign-up"
              style={{
                color: "#1e3c72",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
