import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TomarHora = () => {
    const [citaInfo, setCitaInfo] = useState({
        rut: '',
        tipoExamen: '',
        fecha: '',
        hora: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCitaInfo({ ...citaInfo, [name]: value });
    };

    const handleSolicitarCita = (e) => {
        e.preventDefault();
        if (!citaInfo.rut || !citaInfo.tipoExamen) {
            alert("Por favor complete el RUT y el Tipo de Examen.");
        } else {
            const script = `
                <script>
                rut = '${citaInfo.rut}';
                tipoExamen = '${citaInfo.tipoExamen}';
                fecha = '${citaInfo.fecha}';
                hora = '${citaInfo.hora}';
                </script>`;
            alert('Script de JavaScript:\n' + script);
        }
    };

    return (
        <div className="container">
            <h2>Solicitud de Cita Médica</h2>
            <form onSubmit={handleSolicitarCita}>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT (sin puntos ni guión):</label>
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        pattern="[0-9]{7,8}" 
                        title="Ingrese un RUT válido"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Examen:</label>
                    <div className='mb-3 d-flex'>
                        <div className='me-3'>
                            <label>
                                Scanner
                                <input
                                    className="ms-1"
                                    type="radio"
                                    name="tipoExamen"
                                    value="Scanner"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className='me-3'>
                            <label>
                                Resonancia Magnética
                                <input
                                    className="ms-1"
                                    type="radio"
                                    name="tipoExamen"
                                    value="Resonancia Magnética"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className='me-3'>
                            <label>
                                Ecografía
                                <input
                                    className="ms-1"
                                    type="radio"
                                    name="tipoExamen"
                                    value="Ecografía"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className='me-3'>
                            <label>
                                Radiografía
                                <input
                                    className="ms-1"
                                    type="radio"
                                    name="tipoExamen"
                                    value="Radiografía"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                        Fecha de la Cita:
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hora" className="form-label">
                        Hora de la Cita:
                    </label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Solicitar Cita
                </button>
            </form>
            <br />
            <Link to="/">
                <button type="submit" className="btn btn-primary">
                    Volver
                </button>
            </Link>
        </div>
    );
};

export default TomarHora;
