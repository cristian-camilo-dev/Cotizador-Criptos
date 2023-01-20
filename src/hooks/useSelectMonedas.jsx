import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Lato", sans-serif;
  color: #fff;
  display: block;
  font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
   
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-family: "Lato", sans-serif;

`;

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('');


  const SelectMonedas = () => (
    <>
      <Label htmlFor="">{label}</Label>
      <Select 
        value={state} 
        onChange={(e) => setState(e.target.value)}
        >
        <option value="">-- Seleccione --</option>

        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.name}
          </option>
        ))}
      </Select>
    </>
  );

  return [ state ,SelectMonedas];
};

export default useSelectMonedas;
