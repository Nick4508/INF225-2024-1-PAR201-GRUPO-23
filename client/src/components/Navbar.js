import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username, onLogout }) {
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    setIsAdmin(username === 'admin');
  }, [username]);
  const usernameStyle = {
    color: 'white', // Establecer el color del texto a blanco
    // Otros estilos si es necesario (tamaño de fuente, etc.)
  };
  return (
    <div>
      <div className="navbar">
        <div className="navbar-logo">
          EasyTake
        </div>
        <ul className="navbar-menu">
          <li><Link to="/TomarHora">TomarHora</Link></li>
          {isAdmin && <li><Link to="/ModificarHora">ModificarHora</Link></li>}
          <li>
            <div style={usernameStyle}>
                {username}

            </div>
            </li>
            <li onClick={onLogout}><Link to='/'>Cerrar sesión</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
