import { useState, createContext } from 'react';
import axios from 'axios';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
	const [busqueda, setBusqueda] = useState({
		ciudad: '',
		pais: '',
	});

	const [error, setError] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [resultadoClima, setResultadoClima] = useState({});

	const datosBusqueda = (e) => {
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		});
	};

	const consultarClima = async (datos) => {
		setCargando(true);
		setError(false);
		try {
			const { ciudad, pais } = datos;
			const appId = import.meta.env.VITE_API_KEY;

			// url para conocer la latitud y longuitud de la ciudad
			const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

			const { data } = await axios(url);
			const { lat, lon } = data[0];

			// Obteniendo el clima de la ciudad
			const urlClima = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
			const { data: clima } = await axios(urlClima);

			setResultadoClima(clima);
		} catch (error) {
			setError('Algo ha salido mal. Verifica que los datos son Correctos.');
		} finally {
			setCargando(false);
		}
	};

	return (
		<ClimaContext.Provider value={{ busqueda, datosBusqueda, consultarClima, resultadoClima, error, cargando }}>
			{children}
		</ClimaContext.Provider>
	);
};

export { ClimaProvider };
export default ClimaContext;
