import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(username === 'admin');
  }, [username]);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-logo">
          EasyTake
        </div>
        <ul className="navbar-menu">
          <li><Link to="/TomarHora">TomarHora</Link></li>
          {isAdmin && <li><Link to="/ModificarHora">ModificarHora</Link></li>}
          <li>{username}</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
