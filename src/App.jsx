import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TarjetaClima from "./components/TarjetaClima";

function App() {
  const [clima, setClima] = useState({
    name: "",
    main: { temp: "" },
    sys: { country: "" },
  });
  console.log(clima, "este es clima");
  const [climaGeneral, setClimaGeneral] = useState({
    paisIngresado: "Argentina",
    ciudadIngresada: "Tucuman",
  });
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    consultarApi();
  }, [climaGeneral]);
  const consultarApi = async () => {
    try {
      setMostrarSpinner(true);
      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${climaGeneral.ciudadIngresada},${climaGeneral.paisIngresado}&units=metric&appid=c11b26f5dbfad2055d463476688199cd`
      );
      const dato = await respuesta.json();
      setClima(dato);
      console.log(dato);
      setMostrarSpinner(false);
    } catch (error) {}
  };
  const onSubmit = (data) => {
    console.log("aca agrego logica");
    setClimaGeneral(data);
  };

  return (
    <div>
      <Container className="mainSection">
        <Card className="my-5">
          <Card.Header as="h5">clima del mundo</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pais</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un pais"
                  {...register("paisIngresado", {
                    required: "el pais es un dato obligatorio",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "el pais debe cumplir con un formato valido como el siguiente ej: Chile",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.paisIngresado?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese ciudad"
                  {...register("ciudadIngresada", {
                    required: "el pais es un dato obligatorio",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "la ciudad debe cumplir con un formato valido como el siguiente ej: Tucuman",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.ciudadIngresada?.message}
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {mostrarSpinner === true ? (
          <div className="my-5">
            {" "}
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <TarjetaClima datosClima={clima} />
        )}
      </Container>
    </div>
  );
}

export default App;
