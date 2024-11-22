import styled from "styled-components";
import { useState, useEffect } from "react";

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Nombre: "",
    Fk_Dispositivos2: "",
    temperatura_optima_min: "",
    temperatura_optima_max: "",
    humedad_optima_min: "",
    humedad_optima_max: "",
    calidad_del_aire: "",
  });

  // Realizar el GET de los productos de manera automática
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`$https://coolfresh-api.freemyip.com/productos`);
        const data = await response.json();
        console.log("Productos recibidos:", data);
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();

    // Configurar un intervalo para hacer la petición cada 5 segundos
    const intervalId = setInterval(fetchProductos, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // Agregar un nuevo producto al estado local
  const addProduct = async () => {
    try {
      const response = await fetch(`https://coolfresh-api.freemyip.com/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProductos([...productos, data]);
        setNewProduct({
          Nombre: "",
          Fk_Dispositivos2: "",
          temperatura_optima_min: "",
          temperatura_optima_max: "",
          humedad_optima_min: "",
          humedad_optima_max: "",
          calidad_del_aire: "",
        });
      } else {
        console.error("Error al agregar el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e, field) => {
    setNewProduct({ ...newProduct, [field]: e.target.value });
  };

  // Eliminar un producto con id_Dispositivo
  const deleteProduct = async (id_Productos) => {
    try {
      const response = await fetch(`https://coolfresh-api.freemyip.com/productos/${id_Productos}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Actualizar la lista de productos localmente
        setProductos(productos.filter((producto) => producto.id_Productos !== id_Productos));
      } else {
        console.error("Error al eliminar el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Container>
      <h1>Productos</h1>

      <InputContainer>
       
        <Input
          type="text"
          value={newProduct.Fk_Dispositivos2}
          onChange={(e) => handleInputChange(e, "Fk_Dispositivos2")}
          placeholder="Dispositivo"
        />
         <Input
          type="text"
          value={newProduct.Nombre}
          onChange={(e) => handleInputChange(e, "Nombre")}
          placeholder="Producto"
        />
        <Input
          type="text"
          value={newProduct.temperatura_optima_min}
          onChange={(e) => handleInputChange(e, "temperatura_optima_min")}
          placeholder="Temperatura Mínima"
        />
        <Input
          type="text"
          value={newProduct.temperatura_optima_max}
          onChange={(e) => handleInputChange(e, "temperatura_optima_max")}
          placeholder="Temperatura Máxima"
        />
        <Input
          type="text"
          value={newProduct.humedad_optima_min}
          onChange={(e) => handleInputChange(e, "humedad_optima_min")}
          placeholder="Humedad Mínima"
        />
        <Input
          type="text"
          value={newProduct.humedad_optima_max}
          onChange={(e) => handleInputChange(e, "humedad_optima_max")}
          placeholder="Humedad Máxima"
        />
        <Input
          type="text"
          value={newProduct.calidad_del_aire}
          onChange={(e) => handleInputChange(e, "calidad_del_aire")}
          placeholder="Calidad del Aire"
        />
        <Button onClick={addProduct}>Agregar</Button>
      </InputContainer>

      <Table>
        <thead>
          <tr>
            <th>id_Productos</th>
            <th>Fk_Dispositivos</th>
            <th>Producto</th>
            <th>Temperatura Mínima</th>
            <th>Temperatura Máxima</th>
            <th>Humedad Mínima</th>
            <th>Humedad Máxima</th>
            <th>Calidad del Aire</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.id_Productos}</td>
                <td>{producto.Fk_Dispositivos2}</td>
                <td>{producto.Nombre}</td>
                <td>{producto.temperatura_optima_min}</td>
                <td>{producto.temperatura_optima_max}</td>
                <td>{producto.humedad_optima_min}</td>
                <td>{producto.humedad_optima_max}</td>
                <td>{producto.calidad_del_aire}</td>
                <td>
                  <Button onClick={() => deleteProduct(producto.id_Productos)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Cargando productos...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px;
  color: ${({ theme }) => theme.text};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
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

const Input = styled.input`
  width: 45%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
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
