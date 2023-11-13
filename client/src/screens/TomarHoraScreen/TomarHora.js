import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const TomarHora = () => {
    const [citaInfo, setCitaInfo] = useState({
        nombre: '',
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
                Rut: '${citaInfo.rut}'
                Tipo Examen: '${citaInfo.tipoExamen}'
                Fecha: '${citaInfo.fecha}'
                Hora: '${citaInfo.hora}'
                `;
            alert('Su hora fue ingresada al sistema\n' + script);
            
        }
    };

    return (
        <div className="container">
            <h2>Solicitud de Cita Médica</h2>
            <form onSubmit={handleSolicitarCita}>
            <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        title="Ingrese Nombre"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT (sin puntos ni guión):</label>
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        pattern="[0-9]{7,10}" 
                        title="Ingrese un RUT válido"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email:</label>
                    <input
                        type="text"
                        id="mail"
                        name="mail"
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
                                    value="scanners"
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
                                    value="resonancias"
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
                                    value="ecografias"
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
                                    value="radiografias"
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
                <Link to={`/Conexion?rut=${citaInfo.rut}&tipoExamen=${citaInfo.tipoExamen}&fecha=${citaInfo.fecha}&hora=${citaInfo.hora}&nombre=${citaInfo.nombre}&mail=${citaInfo.mail}`}>
                    <button className="btn btn-primary">
                        Solicitar Cita
                    </button>
                </Link>
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
