import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Conexion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const rut = queryParams.get('rut');
    const tipoExamen = queryParams.get('tipoExamen');
    const fecha = queryParams.get('fecha');
    const hora = queryParams.get('hora');

    return (
        <div className="container">
            <h2>Datos Examen</h2>
            <p>Rut: {rut}</p>
            <p>Tipo de Examen: {tipoExamen}</p>
            <p>Fecha: {fecha}</p>
            <p>Hora: {hora}</p>
            <Link to="/">
            <button type="submit" className="btn btn-primary">
                    Volver
                </button>
            </Link>
        </div>
    );
};

export default Conexion;
