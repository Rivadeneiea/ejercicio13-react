import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const TarjetaClima = ({ datosClima }) => {
  console.log(datosClima);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{datosClima.name}</Card.Title>
        <Card.Text>pais:{datosClima.sys.country}</Card.Text>
        <Card.Text>temperatura:{datosClima.main.temp}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TarjetaClima;
