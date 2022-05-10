import React, { useState } from 'react';
import useClima from '../hooks/useClima';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Formulario = () => {
	const { busqueda, datosBusqueda, consultarClima } = useClima();
	const { ciudad, pais } = busqueda;

	const [alerta, setAlerta] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();

		if (Object.values(busqueda).includes('')) {
			setAlerta('Todos los campos son Obligatorios.');
			setTimeout(() => {
				setAlerta('');
			}, 5000);
			return;
		}

		consultarClima(busqueda);
	};

	return (
		<div className='contenedor'>
			{alerta && (
				<p className='alerta'>
					<span className='icono'>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
					<span>{alerta}</span>
				</p>
			)}
			<form action='' onSubmit={handleSubmit}>
				<div className='campo'>
					<label htmlFor='ciudad'>Ciudad</label>
					<input type='text' id='ciudad' name='ciudad' onChange={datosBusqueda} value={ciudad} />
				</div>
				<div className='campo'>
					<label htmlFor='pais'>País</label>
					<select id='pais' name='pais' onChange={datosBusqueda} value={pais}>
						<option value=''>-- Seleccione un País --</option>
						<option value='US'>Estados Unidos</option>
						<option value='MX'>México</option>
						<option value='AR'>Argentina</option>
						<option value='CO'>Colombia</option>
						<option value='CR'>Costa Rica</option>
						<option value='NI'>Nicaragüa</option>
						<option value='ES'>España</option>
						<option value='PE'>Perú</option>
					</select>
				</div>
				<input type='submit' value='Consultar Clima' />
			</form>
			{/* {error && (
				<p className='alerta'>
					<span className='icono'>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
					<span>{error}</span>
				</p>
			)} */}
		</div>
	);
};

export default Formulario;
