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
            scanners: ["08:30", "9:30", "10:30", "11:30", "14:00", "15:00"], // Cada 1 hora
            resonancias: ["08:30", "10:00", "11:30", "14:00"], // 1 hora y media
            ecografias: ["8:30", "9:00","9:30","10:00" ,"10:30","11:00", "11:30","12:00", "14:00", "14:30", "15:00", "15:30"], // cada 30
            radiografias: ["8:30", "9:00","9:30","10:00" ,"10:30","11:00", "11:30","12:00", "14:00", "14:30", "15:00", "15:30"]
        };
        return horasPorTipo[tipoExamen] || [];
    };
    
    useEffect(() => {
        const horasParaExamen = obtenerHorasPorTipo(citaInfo.tipoExamen);
        setHorasDisponibles(horasParaExamen);
    }, [citaInfo.tipoExamen]);

    // Maquinas
    // 7 radiografias
    // 3 scanner
    //  5 ecografias
    //  2 resonancias
    // const [cantidadMaquinas, setCantidadMaquinas] = useState([]);
	// const [cupos, setCupos] = useState([]);
    // const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	const fetch = async () => {
    //         try {
    //             const formattedDate = citaInfo.fecha.toISOString().split('T')[0];
    //             const response = await fetch(`http://localhost:5000/${citaInfo.tipoExamen}/fecha/:${formattedDate}`);
    //             const data = await response.json();
    //             console.log("alo");
    //             console.log('Datos recibidos:', data);
    //             // if (citaInfo.tipoExamen === "scanners"){
    //             //     setCantidadMaquinas(3);
    //             // } else if (citaInfo.tipoExamen === "radiografias"){
    //             //     setCantidadMaquinas(7);
    //             // } else if (citaInfo.tipoExamen === "ecografias"){
    //             //     setCantidadMaquinas(5);
    //             // } else if (citaInfo.tipoExamen === "resonancias"){
    //             //     setCantidadMaquinas(2);
    //             // }
    //             // setCupos(cantidadMaquinas-cantidadQuerys)
    //             // setLoading(false);
    //         } catch (error) {
    //             console.error('Error al obtener la colección de radiografías:', error);
    //             // setLoading(false);
    //         }
	// 	};

	// 	fetch();
	// }, );
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
