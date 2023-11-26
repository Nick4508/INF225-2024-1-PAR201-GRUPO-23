import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TomarHora = () => {
    const [citaInfo, setCitaInfo] = useState({
        nombre: '',
        rut: '',
        tipoExamen: '',
        fecha: '',
        hora: '',
        random: ''
    });

    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [cantidadExamenes, setCantidadExamenes] = useState([]);

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
    const obtenerHorasPorTipo = (tipoExamen) =>{
        const horasPorTipo = {
            scanners: { horas: ["08:30", "09:30", "10:30", "11:30", "14:00", "15:00"], maquinas: 3}, // Cada 1 hora
            resonancias: {horas: ["08:30", "10:00", "11:30", "14:00"], maquinas: 2}, // 1 hora y media
            ecografias: {horas: ["08:30", "09:00","09:30","10:00" ,"10:30","11:00", "11:30","12:00", "14:00", "14:30", "15:00", "15:30"], maquinas: 5}, // cada 30
            radiografias: {horas: ["08:30", "09:00","09:30","10:00" ,"10:30","11:00", "11:30","12:00", "14:00", "14:30", "15:00", "15:30"], maquinas: 7}
        };
        return horasPorTipo[tipoExamen];
    };
    // Maquinas
    // 7 radiografias
    // 3 scanner
    //  5 ecografias
    //  2 resonancias
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Obtén horas para cada tipo de examen
                const horasParaExamen = obtenerHorasPorTipo(citaInfo.tipoExamen);
    
    
                // Inicializa un arreglo para almacenar los resultados
                const resultados = [];
    
                //Realiza una solicitud para cada hora del tipo de examen
                for (const hora of horasParaExamen.horas) {
                    const response = await fetch(`http://localhost:5000/${citaInfo.tipoExamen}/fecha/:${citaInfo.fecha}/random/${hora}`);
                    const data = await response.json();
                    const total = data.radiografiasPorFecha.length
                    
                    // Agrega los resultados al arreglo
                    const cantidad = horasParaExamen.maquinas - total;
                   
                    if (cantidad !== 0){
                        resultados.push(hora);
                    }
                       //eco 1 rad 5 res 1 sc 2
                }
    
                // Imprime los resultados
                console.log('Resultados para cada hora:', resultados);
    
                // Actualiza el estado con las horas disponibles
                setHorasDisponibles(resultados);
            } catch (error) {
                console.error('Error al obtener la cantidad', error);
                const response = await fetch(`http://localhost:5000/${citaInfo.tipoExamen}/fecha/:${citaInfo.fecha}/random/alo`);
                const data = await response.json();
              
                
            }
        };
    
        obtenerDatos();
    }, [citaInfo.fecha, citaInfo.tipoExamen]);
    
      
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
                        pattern="^[0-9]{7,8}[kK]?$" 
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
                    <select
                        id="hora"
                        name="hora"
                        className="form-control"
                        required
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona una hora</option>
                        {horasDisponibles.map((hora, index) => (
                            <option key={index} value={hora}>
                                {hora}
                            </option>
                        ))}
                    </select>
                </div>
                <Link to={`/Conexion?rut=${citaInfo.rut}&tipoExamen=${citaInfo.tipoExamen}&fecha=${citaInfo.fecha}&hora=${citaInfo.hora}&nombre=${citaInfo.nombre}&mail=${citaInfo.mail}&random=${citaInfo.hora}`}>
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
