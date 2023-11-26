import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
  };
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
            <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Cerrar Sesión</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
