import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";

import Navbar from './components/Navbar';
import PrincipalRadiografias from './components/principalRadiografias';
import PrincipalScanners from './components/principalScanners';
import PrincipalEcografias from './components/principalEcografias';
import PrincipalResonancias from './components/principalResonancias';
import LoginForm from './components/LoginForm';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale } from 'react-datepicker';
// import { set } from '../../server/App';
registerLocale("es", es);

function App() {
	const [loggedIn, setLoggedIn] = useState(false); 
	const [username, setUsername] = useState('');
	
	useEffect(() => {
		const loggedInState = localStorage.getItem('loggedIn');
		const savedUsername = localStorage.getItem('username');
	
		if (loggedInState === 'true' && savedUsername) {
		  setLoggedIn(true);
		  setUsername(savedUsername);
		}
	  }, []);
	const handleLogin = (username) => {
		setLoggedIn(true); // Indicar que el usuario ha iniciado sesión
		setUsername(username);
		localStorage.setItem('loggedIn', 'true'); // Guardar el estado de inicio de sesión
		localStorage.setItem('username', username); // Guardar el nombre de usuario
	  };

	const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
	const [opcionSeleccionada, setOpcionSeleccionada] = useState('todos');
	const handleOpcionChange = (opcion) => {
		setOpcionSeleccionada(opcion);
	  };
	const handleFechaChange = (date) => {
	// Obtener la fecha actual de fechaSeleccionada
	const fechaActual = fechaSeleccionada || new Date();
	
	// Establecer la hora actual en la fecha actual
	const nuevaHora = new Date().getHours() - 3;
	const nuevoMinuto = new Date().getMinutes();
	// Establecer la nueva hora en la fecha actual
	fechaActual.setHours(nuevaHora);
	fechaActual.setMinutes(nuevoMinuto); // Establecer los minutos deseados
	
	// Mantener la fecha seleccionada y ajustar solo la hora
	const fechaAjustada = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		fechaActual.getHours(),
		fechaActual.getMinutes()
	);
	
	setFechaSeleccionada(fechaAjustada);
	};

	const renderPrincipalComponent = () => {
		switch (opcionSeleccionada) {
			
			case 'radiografias':
				return <div><PrincipalRadiografias fechaSeleccionada={fechaSeleccionada} /></div>
			case 'scanners':
				return <div><PrincipalScanners fechaSeleccionada={fechaSeleccionada} /></div>;
			case 'ecografias':
				return  <div><PrincipalEcografias fechaSeleccionada={fechaSeleccionada} /></div>;
			case 'resonancias':
				return  <div><PrincipalResonancias fechaSeleccionada={fechaSeleccionada} /></div>;
			case 'todos':
				return (
					<div>
						<PrincipalRadiografias fechaSeleccionada={fechaSeleccionada} />
						<PrincipalScanners fechaSeleccionada={fechaSeleccionada} />
						<PrincipalEcografias fechaSeleccionada={fechaSeleccionada} />
						<PrincipalResonancias fechaSeleccionada={fechaSeleccionada} />
					</div>
				);
		  default:
			return null
		}
	}
	return (
	<div>
		{loggedIn ? (
		<div>
			<Navbar username={username}/>
			<div className="container">
				<div className="row mt-4 d-flex justify-content-center align-items-center">
					<div className="col-6">
						<h5>Selecciona la fecha de los exámenes</h5>
						<DatePicker
							selected={fechaSeleccionada}
							onChange={handleFechaChange}
							locale="es"
							dateFormat="dd-MM-yyyy"
							
							timeFormat="HH:mm"
						/>
					</div>
					<div className="col-6">
						<h5>Selecciona el examen</h5>
						<select
							className="form-select"
							onChange={(e) => handleOpcionChange(e.target.value)}
							value={opcionSeleccionada}
						>
						<option value="radiografias">Radiografías</option>
						<option value="scanners">Scanners</option>
						<option value="ecografias">Ecografías</option>
						<option value="resonancias">Resonancias</option>
						<option value="todos">Todos los exámenes</option>
						</select>
					</div>
				</div>
				<div class="row mt-4 d-flex flex-column justify-content-center align-items-center">
					{renderPrincipalComponent()}
				</div>
			</div>
		</div>
	):(
		<div>
          <h1>Iniciar Sesión</h1>
          <LoginForm onLogin={handleLogin} />
		</div>
	)
	}
	</div>
); 
}

export default App;