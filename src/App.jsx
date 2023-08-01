import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [ciudad, setCiudad] = useState("Tucuman");
  const [pais, setPais] = useState("ar");
  const [clima, setClima] = useState([]);
  useEffect(() => {
    consultarApi();
  }, []);
  const consultarApi = async () => {
    try {
      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Tucuman,ar&units=metric&appid=c11b26f5dbfad2055d463476688199cd`
      );
      const dato = await respuesta.json();
      setClima(dato.results);
      console.log(dato);
    } catch (error) {}
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default App;
