import React, { useEffect, useState } from 'react';

function encontrarHoras ({ rut, tipoExamen }) {
    const [datos, setDatos] = useState([])
    const fetch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${tipoExamen}/rut/${rut}`);
            const data = await response.json();
            setDatos(data)
        } catch (error) {
            const response = await fetch(`http://localhost:5000/radiografias/rut/errorencontrado`);
            const data = await response.json();
        }
    };

    useEffect(() => {
        fetch();
    }, [rut, tipoExamen]);

    return datos;  
}

export default encontrarHoras;