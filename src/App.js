import React, {useState, useEffect} from 'react';
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";

import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";


const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }    
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
  @media(max-width: 400px){
    max-width: 50%;
    margin-left: 25%;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  @media(max-width: 400px){
    margin-top: 0;
    margin-bottom: 0;
  }
  
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

    const [moneda, guardaMoneda] = useState('');
    const [criptomoneda, guardarCriptomoneda] = useState('');
    const [resultado, guardarResultado] = useState({});
    const [cargando, guardarCargando] = useState(false);

    useEffect(() => {

        const cotizarCriptomoneda = async () => {

            if (moneda === '') return;

            // consultar api para obtener la cotizacion
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

            const resultado = await axios.get(url)

            // mostrar spinner
            guardarCargando(true);

            // ocultar spinner y mostrar resultado
            setTimeout(() => {
                // guardar spinner como falso para ocultar
                guardarCargando(false);

                //guardar cotizacion
                guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            }, 3000);

        };
        cotizarCriptomoneda();
    }, [moneda, criptomoneda]);

    const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>;

    return (
        <Contenedor>
            <div>
                <Imagen src={imagen} alt="Imagen crypto"/>
            </div>
            <div>
                <Heading>Cotiza Criptomonedas al Instante</Heading>
                <Formulario
                    guardarMoneda={guardaMoneda}
                    guardarCriptomoneda={guardarCriptomoneda}
                />
                {componente}
            </div>

        </Contenedor>
    );
}

export default App;
