import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';
import formatRUT from '../../components/formatRUT';
import { Link } from 'react-router-dom';

function ModResonancia({ fechaSeleccionada }) {

  // const history = useHistory()
  const [radiografias, setRadiografias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRadiografias = async () => {
      try {
        const formattedDate = fechaSeleccionada.toISOString().split('T')[0];
        const response = await fetch(`http://localhost:5000/resonancias/fecha/:${formattedDate}`);
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setRadiografias(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la colección de ecografias:', error);
        setLoading(false);
      }
    };

    fetchRadiografias();
  }, [fechaSeleccionada]);

  return (
    <div>
      <h1>Lista de Resonancias</h1>
     
      {loading ? (
        <p>Cargando...</p>
      ) : radiografias.length === 0 ? (
        <p>No hay exámenes para la fecha seleccionada</p>
      ) : (
        <div div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {radiografias.map((radiografia) => (
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
                {/* boton */}
                 <Link to={`/HoraModificada/?id=${radiografia._id}&examen=resonancias`} className="btn btn-primary">
                 Modificar
               </Link>
                    
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>

      )}
    </div>
  );
}

export default ModResonancia;
