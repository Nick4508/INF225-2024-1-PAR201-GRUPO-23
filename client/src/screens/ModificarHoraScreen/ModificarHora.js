import React from 'react';

const ModificarHora = () => {
    return (
        <div className="container">
            <h2>Cita Médica de Paciente</h2>
            <form action="" method="post">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input type="text" id="nombre" className="form-control" value="Nicolas Rodríguez" readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT:</label>
                    <input type="text" id="rut" className="form-control" value="14.759.409-K" readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
                    <input type="email" id="correo" className="form-control" value="usuario@gmail.com" readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha de la Cita:</label>
                    <input type="date" id="fecha" className="form-control" value="2023-10-28" readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="hora" className="form-label">Hora de la Cita:</label>
                    <input type="time" id="hora" className="form-control" value="13:50" readOnly />
                </div>

                <button type="submit" className="btn btn-success">Modificar Hora</button>
            </form>
        </div>
    );
};

export default ModificarHora;
