import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  --glow-color: rgb(255, 215, 0);
  --glow-spread-color: rgba(255, 215, 0, 0.781);
  --enhanced-glow-color: rgb(255, 230, 153);
  --btn-color: rgb(153, 102, 51);
  border: 0.25em solid var(--glow-color);
  padding: 1em 3em;
  color: var(--glow-color);
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: var(--btn-color);
  border-radius: 1em;
  outline: none;
  width: 100%;
  cursor: pointer;
  letter-spacing: 1px;
  margin-top: 100px;

  -webkit-box-shadow: 0 0 1em 0.25em var(--glow-color),
    0 0 4em 1em var(--glow-spread-color),
    inset 0 0 0.75em 0.25em var(--glow-color);
  box-shadow: 0 0 1em 0.25em var(--glow-color),
    0 0 4em 1em var(--glow-spread-color),
    inset 0 0 0.75em 0.25em var(--glow-color);
  text-shadow: 0 0 0.5em var(--glow-color);
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  & ::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--glow-spread-color);
    filter: blur(2em);
    opacity: 0.7;
    transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
  }

  &:hover {
    color: var(--btn-color);
    background-color: var(--glow-color);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
      0 0 4em 2em var(--glow-spread-color),
      inset 0 0 0.75em 0.25em var(--glow-color);
  }

  &:active {
    box-shadow: 0 0 0.6em 0.25em var(--glow-color),
      0 0 2.5em 2em var(--glow-spread-color),
      inset 0 0 0.5em 0.25em var(--glow-color);
  }
`;

export const Formulario = () => {
  const [criptos, setCriptos] = useState([]);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptomoneda, SelectCripto] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );

  

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await fetch(url);
      const monedas = await resultado.json();

    

      const arrayCriptos = monedas.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          name: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  console.log(criptos);

  return (
    <form>
      <SelectMonedas />
      <SelectCripto />
      <InputSubmit type="submit" value="Cotizar 📈" />
    </form>
  );
};
