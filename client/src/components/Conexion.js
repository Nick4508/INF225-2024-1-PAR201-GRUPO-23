import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Conexion = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rut = queryParams.get('rut');
  const tipoExamen = queryParams.get('tipoExamen');
  const fecha = queryParams.get('fecha');
  const hora = queryParams.get('hora');
  const nombre =queryParams.get('nombre')
  const mail = queryParams.get('mail')
  // const random = queryParams.get('random')

  const [nuevosDatos] = useState({
    nombre : nombre,
    rut: rut,
    tipoExamen: tipoExamen,
    email : mail,
    random : `${hora.split(':')[0]}${hora.split(':')[1]}`,
    fecha:   new Date( `${fecha}T03:00:00.000+00:00`),
    hora:  new Date(`${fecha}T${hora}`),
    algo : 10,  
    // Otros campos que desees agregar
  });

  const handleAgregarRadiografia = async () => {
    try {
      // Ajusta la URL del endpoint según el tipo de examen
      const url = `http://localhost:5000/${tipoExamen}/crear`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...nuevosDatos,
            random : nuevosDatos.random,
            fecha: nuevosDatos.fecha.toISOString(),
            hora: nuevosDatos.hora.toISOString(),
          }),
      });

      const radiografiaGuardada = await response.json();
      console.log('Radiografía creada:', radiografiaGuardada);
    } catch (error) {
      console.error('Error al agregar radiografía:', error);
    }
  };

  return (
    <div className="container">
      <h2>Datos Examen</h2>
      <p>Nombre: {nombre}</p>
      <p>Rut: {rut}</p>
      <p>Tipo de Examen: {tipoExamen}</p>
      <p>Email: {mail}</p>
      <p>Fecha: {fecha}</p>
      <p>Hora: {hora}</p>

      {/* Botón para agregar radiografía */}
      <Link to="/">

      <button type="button" className="btn btn-primary" onClick={handleAgregarRadiografia}>
        Agregar examen
      </button>
      </Link>
        <br/>
      <Link to="/">
        <button type="submit" className="btn btn-primary">
          Volver
        </button>
      </Link>
    </div>
  );
};

export default Conexion;
