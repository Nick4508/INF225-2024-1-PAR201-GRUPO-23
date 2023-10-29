import React from "react"
import {Link} from "react-router-dom"

function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-logo">
                EasyTake
            </div>
            <ul className="navbar-menu">
                <li><Link to="TomarHora">TomarHora</Link> </li>
                <li><Link to="ModificarHora">ModificarHora</Link></li>
                <li><Link to="IngresarPaciente">IngresarPaciente</Link></li>

            </ul>

        </div>

    )
}

export default Navbar