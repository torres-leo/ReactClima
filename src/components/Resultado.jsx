import React from 'react';
import useClima from '../hooks/useClima';

const Resultado = () => {
	const { resultadoClima } = useClima();
	const {
		name,
		main: { temp, temp_max, temp_min },
		sys: { country },
	} = resultadoClima;

	// La API da respuesta en Kelvin
	const kelvin = 273.15;

	return (
		<div className='contenedor clima'>
			<h2>
				El Clima de "{name}-{country}" es:
			</h2>
			<p>
				Temperatura: {parseInt(temp - kelvin)}
				<span>&#x2103;</span>
			</p>
			<div className='temps'>
				<p>
					Min : {parseInt(temp_min - kelvin)}
					<span>&#x2103;</span>
				</p>
				<p>
					Máx : {parseInt(temp_max - kelvin)}
					<span>&#x2103;</span>
				</p>
			</div>
		</div>
	);
};

export default Resultado;
