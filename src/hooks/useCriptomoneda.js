import React, {Fragment, useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;  
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;


const useCriptomoneda = (label, stateInicial, opciones) => {

    // state de nuestro ustom hook
    const [state, actualizarState] = useState(stateInicial);


    const SelecctCripto = () => (
        <Fragment>
            <Label htmlFor="selectMoneda">{label}</Label>
            <Select name="" id="selectMoneda"
                    onChange={e => actualizarState(e.target.value)}
                    value={state}>
                <option value="">- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
                        {opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    // retornar state, interfaz y funcion que modifica el state
    return [state, SelecctCripto, actualizarState];
};

export default useCriptomoneda;