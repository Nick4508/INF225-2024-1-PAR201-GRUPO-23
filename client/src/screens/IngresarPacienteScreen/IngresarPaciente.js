import React from 'react';
import { Link } from 'react-router-dom';
const IngresarPaciente = () => {
    return (
        <div className="container">
            <h2>Ingresar nuevo paciente</h2>
            <form action="" method="post">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT (sin puntos ni guión):</label>
                    <input type="text" id="rut" name="rut" pattern="\d{7,8}" title="Ingrese un RUT válido" className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
                    <input type="email" id="correo" name="correo" className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Número de telefono/celular:</label>
                    <input type="text" id="number" name="number" className="form-control" required />
                </div>

                <button type="submit" className="btn btn-primary">Agregar paciente</button>
            </form>
            <Link to="/"><button type="submit" className='btn btn-primary'>Volver</button></Link>

        </div>
    );
};

export default IngresarPaciente;
