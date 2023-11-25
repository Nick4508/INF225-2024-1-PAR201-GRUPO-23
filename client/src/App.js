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
	const [opcionSeleccionada, setOpcionSeleccionada] = useState('radiografias');
	const handleOpcionChange = (opcion) => {
		setOpcionSeleccionada(opcion);
	  };
	const handleFechaChange = (date) => {
		setFechaSeleccionada(date);
	};

	const renderPrincipalComponent = () => {
		switch (opcionSeleccionada) {
		  case 'radiografias':
			return <PrincipalRadiografias fechaSeleccionada={fechaSeleccionada} />;
		  case 'scanners':
			return <PrincipalScanners fechaSeleccionada={fechaSeleccionada} />;
		  case 'ecografias':
			return <PrincipalEcografias fechaSeleccionada={fechaSeleccionada} />;
		  case 'resonancias':
			return <PrincipalResonancias fechaSeleccionada={fechaSeleccionada} />;
		  default:
			return null;
		}
	}
	return (

		
	<div>
		<Navbar />
		<div className="row mt-4 mr-3">
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center">
            <h5>Selecciona la fecha de los exámenes</h5>
            <DatePicker
              selected={fechaSeleccionada}
              onChange={handleFechaChange}
              locale="es"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
        <div className="col-md-6 mr-3">
          <div className="d-flex flex-column align-items-center">
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
            </select>
          </div>
        </div>
      </div>
		<div className='principal' class="row mt-4">
			<div class="row-4 d-flex flex-column align-items-center">{renderPrincipalComponent()}</div>
		</div>
	</div>

); 
}

export default App;