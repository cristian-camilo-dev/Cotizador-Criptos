import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImgCripto from "../src/assets/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    align-items: center;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
  background: rgba(1, 29, 41, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

function App() {
  const [monedas, setMoneda] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizadorCripto = async () => {
        setCargando(true);
        setResultado({});

        const { moneda, criptomoneda } = monedas;
        const url = ` https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        if (resultado.Response !== "Error") {
          setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        }
        setCargando(false);
      };
      cotizadorCripto();
    }
  }, [monedas]);

  return (
    <Container>
      {!resultado.PRICE ? (
        <Image src={ImgCripto} alt="Imagen criptomonedas" />
      ) : (
        <Resultado resultado={resultado} />
      )}

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>;
        <Formulario setMoneda={setMoneda} />
        {cargando ? <Spinner /> : null}
      </div>
    </Container>
  );
}

export default App;
