import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import TarjetaClima from "./components/TarjetaClima";

function App() {
  const [ciudad, setCiudad] = useState("Tucuman");
  const [pais, setPais] = useState("ar");
  const [clima, setClima] = useState([]);
  const [climaGeneral, setClimaGeneral] = useState(ciudad, pais);
  useEffect(() => {
    consultarApi();
  }, [ciudad, pais]);
  const consultarApi = async () => {
    try {
      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${ciudad},${pais}&units=metric&appid=c11b26f5dbfad2055d463476688199cd`
      );
      const dato = await respuesta.json();
      setClima(dato.results);
      console.log(dato);
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setClimaGeneral();
  };
  const selectorCiudad = (e) => {
    setCiudad(e.target.value);
  };
  const selectorPais = (e) => {
    setPais(e.target.value);
  };

  return (
    <>
      <h1>Clima del mundo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Pais</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Pais"
            onChange={selectorPais}
            value={clima.pais}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={selectorCiudad}
          value={clima.ciudad}
        >
          <Form.Label>ciudad</Form.Label>
          <Form.Control type="text" placeholder="Ingrese ciudad" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {climaGeneral.map((clima) => (
        <TarjetaClima clima={clima} />
      ))}
    </>
  );
}

export default App;
