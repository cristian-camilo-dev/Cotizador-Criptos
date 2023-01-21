import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
  background: #07182e;
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  color: #fff;

  font-family: "Lato", sans-serif;

  &::before {
    content: "";
    position: absolute;
    width: 100px;
    background-image: linear-gradient(
      180deg,
      rgb(0, 183, 255),
      rgb(255, 48, 255)
    );
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

  &::after {
    content: "";
    position: absolute;
    background: #07182e;
    inset: 5px;
    border-radius: 15px;
  }
`;

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;

  }
  z-index: 1;
`;

const Precio = styled.p`
  font-size: 30px;
  z-index: 1;
  span {
    font-weight: 700;
  }
`;

const Imagen = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px;
    z-index: 1;
`;

export const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL } =
    resultado;
  return (
    <ResultadoDiv>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL} `}
        alt="Imagen cripto"
      />
      <Precio>
        El precio es: <span>{PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span> {HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span> {LOWDAY}</span>
      </Info>
      <Info>
        Variación últimas 24 horas: <span> {CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Última actualización: <span> {LASTUPDATE}</span>
      </Info>
    </ResultadoDiv>
  );
};
