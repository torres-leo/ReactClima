import React from 'react';
import Formulario from './Formulario';
import Resultado from './Resultado';
import Spinner from './Spinner';
import useClima from '../hooks/useClima';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const AppClima = () => {
	const { resultadoClima, cargando, error } = useClima();
	return (
		<>
			<main className='dos-columnas'>
				<Formulario />
				{cargando ? (
					<Spinner />
				) : error ? (
					<div className='alerta'>
						<FontAwesomeIcon icon={faCircleExclamation} size='2x' />
						<p>{error}</p>
					</div>
				) : resultadoClima?.name ? (
					<Resultado />
				) : (
					''
				)}
			</main>
		</>
	);
};

export default AppClima;
