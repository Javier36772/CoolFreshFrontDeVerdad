import styled from "styled-components";
import { useState, useEffect } from "react";

export function Alertas() {
  const [alertas, setAlertas] = useState([]);

  // Realizar el GET de las alertas de manera automática
  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await fetch("http://localhost:3000/Notificacion");
        const data = await response.json();
        console.log("Alertas recibidas:", data);
        setAlertas(data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener alertas:", error);
      }
    };

    fetchAlertas();

    // Configurar un intervalo para hacer la petición cada 5 segundos
    const intervalId = setInterval(fetchAlertas, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); 

  // Función para eliminar una alerta
  const deleteAlerta = async (id_Notificaciones) => {
    try {
      console.log("Intentando eliminar alerta con ID:", id_Notificaciones);
      const response = await fetch(`http://localhost:3000/Notificacion/${id_Notificaciones}`, {
        method: "DELETE",
      });

      console.log("Respuesta del servidor:", response.status);

      if (response.ok) {
        console.log("Alerta eliminada exitosamente");
        // Actualizar la lista de alertas localmente
        setAlertas(alertas.filter((alerta) => alerta.id_Notificaciones !== id_Notificaciones));
      } else {
        const errorText = await response.text();
        console.error("Error al eliminar la alerta:", response.statusText, errorText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Container>
      <h1>Alertas</h1>
      <Table>
        <thead>
          <tr>
            <th>Notificaciones</th>
            <th>Dispositivos</th>
            <th>Productos</th>
            <th>Tipo</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alertas.length > 0 ? (
            alertas.map((alerta, index) => (
              <tr key={index}>
                <td>{alerta.id_Notificaciones}</td>
                <td>{alerta.Fk_Dispositivos}</td>
                <td>{alerta.Nombre}</td>
                <td>{alerta.tipo}</td>
                <td>{alerta.mensaje}</td>
                <td>{alerta.fecha_envio}</td>
                <td>{alerta.estado}</td>
                <td>
                  <Button onClick={() => deleteAlerta(alerta.id_Notificaciones)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Cargando alertas...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

// Estilos permanecen igual...

const Container = styled.div`
  height: 100vh;
  padding: 20px;
  color: ${({ theme }) => theme.text};
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
