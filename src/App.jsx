import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImgCripto from "../src/assets/imagen-criptos.png";
import { Formulario } from "./components/Formulario";

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
    align-items: end;
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
  const [resultado , setResultado] = useState({});
  

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizadorCripto = async () => {
      const { moneda, criptomoneda } = monedas;
      const url =` https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`; 
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setResultado(resultado.DISPLAY[criptomoneda][moneda]);
    }
    cotizadorCripto();
  }
    
  }, [monedas]);

  return (
    <Container>
      <Image src={ImgCripto} alt="Imagen criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>;
        <Formulario setMoneda={setMoneda} />
      </div>
    </Container>
  );
}

export default App;
