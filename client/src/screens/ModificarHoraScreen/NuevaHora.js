import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import formatRUT from '../../components/formatRUT';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, ListGroup } from 'react-bootstrap';

const NuevaHora = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rut = queryParams.get('rut');
  const tipoExamen = queryParams.get('tipoExamen');
  const fecha = queryParams.get('fecha');
  const hora = queryParams.get('hora');
  const nombre =queryParams.get('nombre')
  const mail = queryParams.get('mail')
  const id = queryParams.get('id')
  // const random = queryParams.get('random')
//   const [radiografia, setRadiografias] = useState([]);

  const [nuevosDatos] = useState({
    nombre : nombre,
    rut: rut,
    tipoExamen: tipoExamen,
    email : mail,
    random : `${hora.split(':')[0]}:${hora.split(':')[1]}`,
    fecha:   new Date( `${fecha}T03:00:00.000+00:00`),
    hora:  new Date(`${fecha}T${hora}`),
    // Otros campos que desees agregar
  });
 

//   useEffect(() => {
//     const fetchRadiografias = async () => {
//       try {
        
//         const response = await fetch(`http://localhost:5000/${tipoExamen}/id/${id}`);
//         const data = await response.json();

//         console.log('Datos recibidos:', data);
//         setRadiografias(data);
//       } catch (error) {
//         console.error('Error al obtener la colección de Scanners:', error);
//       }
//     };

//     fetchRadiografias();
//   }, [id,tipoExamen]);

  const handleAgregarRadiografia = async () => {
    try {
        await fetch(`http://localhost:5000/${tipoExamen}/id/${id}`, {
            method: 'DELETE',
            });
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
      
      
    <div>
        {/* <div>
        
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<Card key={radiografia._id} style={{ width: '18rem', margin: '1rem' }}>
				<Card.Body>
					<Card.Title>{radiografia.nombre}</Card.Title>
					<ListGroup variant="flush">
					<ListGroup.Item>
						<strong>RUT:</strong> {formatRUT(radiografia.rut)}
					</ListGroup.Item>
					<ListGroup.Item>
						<strong>Fecha:</strong>{' '}
						{new Date(radiografia.fecha).toLocaleDateString('es-ES')}
					</ListGroup.Item>
					<ListGroup.Item>
						<strong>Hora:</strong>{' '}
						{radiografia.hora
						? new Date(radiografia.hora).toLocaleTimeString('es-ES')
						: 'Hora no disponible'}
					</ListGroup.Item>
					<ListGroup.Item>
						<strong>Email:</strong> {radiografia.email}
					</ListGroup.Item>
					</ListGroup>
				</Card.Body>
				</Card>
			
			</div>
		 */}
        {/* </div> */}
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
           Modificar
        </button>
        </Link>
            <br/>
        <Link to="/">
            <button type="submit" className="btn btn-primary">
            Volver
            </button>
        </Link>
        </div>
    </div>
  );
};

export default NuevaHora;
