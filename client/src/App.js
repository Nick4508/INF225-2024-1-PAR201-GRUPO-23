import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import Navbar from './components/Navbar';
import PrincipalRadiografias from './components/principalRadiografias';
import PrincipalScanners from './components/principalScanners';
import PrincipalEcografias from './components/principalEcografias';
import PrincipalResonancias from './components/principalResonancias';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale } from 'react-datepicker';
registerLocale("es", es);

function App() {
	const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

	const handleFechaChange = (date) => {
		setFechaSeleccionada(date);
	};
	return (
	
	<div>
		<Navbar />
		<div class="row mt-4">
			<div class="col-4 d-flex flex-column align-items-center">
				<h5>Selecciona la fecha de los examenes</h5>
				<DatePicker selected={fechaSeleccionada} onChange={handleFechaChange} locale="es" dateFormat="dd-MM-yyyy" />
			</div>
			<div className='principal' class="col-8">
				<ul style={{ listStyle: 'none', padding: 0 }}>
					<li>
						<PrincipalRadiografias fechaSeleccionada={fechaSeleccionada} />
					</li><br/>
					<li>
						<PrincipalScanners fechaSeleccionada={fechaSeleccionada} />
					</li><br/>
					<li>
						<PrincipalEcografias fechaSeleccionada={fechaSeleccionada}/>
					</li><br/>
					<li>
						<PrincipalResonancias fechaSeleccionada={fechaSeleccionada}/>
					</li>
				</ul>
				<br/>
			</div>
		</div>
	</div>

); 
}

export default App;