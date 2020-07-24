import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import axios from "axios";

// hooks
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

// components
import Error from "../components/Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3s ease;
  
  &:hover{
    background-color: #326ac0;
    cursor: pointer;
  }`;


const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state del listado de criptomonedas
    const [listaCripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolares Americanos'},
        {codigo: 'SUN', nombre: 'Soles'},
        {codigo: 'EUR', nombre: 'Euros'},
        {codigo: 'GBP', nombre: 'Libra esterlina'}
    ];

    //Utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elije tu moneda', '', MONEDAS);

    //utilizar la criptomoneda
    const [criptomoneda, SelecctCripto] = useCriptomoneda('Elije tu criptomoneda', '', listaCripto);

    console.log('criptomoneda-->', criptomoneda);
    //ejecutar llamado a la Api
    useEffect(() => {
        const consultarApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        };
        consultarApi();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        // validamos si los select estan llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    };

    return (
        <form
            onSubmit={cotizarMoneda}

        >
            {error ? <Error mensaje={'Todos los campos son obligatorios'}></Error> : null}
            <SelectMoneda/>
            <SelecctCripto/>
            <Boton type="submit" value="Calcular"/>
        </form>
    )
};


export default Formulario;