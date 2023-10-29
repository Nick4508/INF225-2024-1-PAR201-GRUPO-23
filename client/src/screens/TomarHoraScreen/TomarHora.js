import React from 'react';
import {Link} from "react-router-dom"
const TomarHora = () => {
    return (
        <div className="container">
            <h2>Solicitud de Cita Médica</h2>
            <form action="" method="post">
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT (sin puntos ni guión):</label>
                    <input type="text" id="rut" name="rut" pattern="\d{7,8}" title="Ingrese un RUT válido" className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha de la Cita:</label>
                    <input type="date" id="fecha" name="fecha" className="form-control" required />
                </div>
                <label className="form-label">Tipo de Examen:</label>
                <div className='mb-3 d-flex'>
                    
                    <div className='me-3'>
                        <label>
                            Scanner 
                            <input className="ms-1" type="radio" name="type"
                                id="scanner" value="other" />
                        </label>
                    </div>
                    <div className='me-3'>
                        <label>
                            Resonancia Magnética 
                            <input className="ms-1" type="radio" name="type"
                                id="resonancia" value="other" />
                        </label>
                    </div>
                    <div className='me-3'>
                        <label>
                            Ecografía 
                            <input className="ms-1" type="radio" name="type"
                                id="ecografia" value="other" />
                        </label>
                    </div>
                    <div className='me-3'>
                        <label>
                            Radiografía 
                            <input className="ms-1" type="radio" name="type"
                                id="radiografia" value="other" />
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="hora" className="form-label">Hora de la Cita:</label>
                    <input type="time" id="hora" name="hora" className="form-control" required />
                </div>

                <button type="submit" className="btn btn-primary">Solicitar Cita</button>
            </form>
            <div>

            <Link to="/"><button type="submit" className='btn btn-primary'>Volver</button></Link>
            </div>

        </div>
    );
};

export default TomarHora;
