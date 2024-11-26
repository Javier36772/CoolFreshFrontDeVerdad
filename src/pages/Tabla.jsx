import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx"; // Importamos la librería XLSX

export function Tabla() {
  const [sensorData, setSensorData] = useState([]); // Mantener todos los datos sin límite

  // Conexión WebSocket para recibir los datos
  useEffect(() => {
    const socket = new WebSocket("wss://coolfresh-api.freemyip.com:4000");

    socket.onopen = () => console.log("Conexión WebSocket abierta");

    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        console.log("Datos recibidos:", receivedData);

        // Formatear los datos de los sensores y agregarlos a la tabla
        const newData = {
          timestamp: new Date().toLocaleString(),
          temperature: receivedData.temperature,
          airQuality: receivedData.gasDetected ? "Detectado" : "No detectado",
          lightIntensity: receivedData.lightLevel,
        };

        setSensorData((prevData) => [...prevData, newData]); // Acumular todos los registros

      } catch (error) {
        console.error("Error al procesar los datos del WebSocket:", error);
      }
    };

    socket.onerror = (error) => console.error("Error en WebSocket:", error);
    socket.onclose = () => console.log("Conexión WebSocket cerrada");

    return () => socket.close();
  }, []);

  // Función para exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sensorData); // Convertir los datos a una hoja de Excel
    const wb = XLSX.utils.book_new(); // Crear un libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Datos de Sensores"); // Agregar la hoja al libro
    XLSX.writeFile(wb, "datos_sensores.xlsx"); // Descargar el archivo Excel
  };

  return (
    <Container>
      <h1>Tabla de Datos</h1>
      
      {/* Botón para exportar los datos a Excel */}
      <Button onClick={exportToExcel}>Descargar como Excel</Button>
      
      <Table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Temperatura (°C)</th>
            <th>Calidad del Aire (ppm)</th>
            <th>Intensidad de Luz (lx)</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.length > 0 ? (
            sensorData.map((data, index) => (
              <tr key={index}>
                <td>{data.timestamp}</td>
                <td>{data.temperature}</td>
                <td>{data.airQuality}</td>
                <td>{data.lightIntensity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cargando datos...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid ${({ theme }) => theme.text};
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: ${({ theme }) => theme.bg3};
  }

  tbody tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.bg4};
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
