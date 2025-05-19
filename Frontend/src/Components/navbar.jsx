import { Link } from "react-router-dom";
import { useState } from "react";
import '../assets/StyleSheets/NavBar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className='Hospital-Name'>
        <Link to={"/"}>XYZ Hospital</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
      </div>

      <div className={`list-items ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/doctor">Doctors</Link></li>
          <li><Link to="/patient">Patient</Link></li>
          <li><Link to="/appointment">Appointments</Link></li>
        </ul>
      </div>
    </nav>
  );
}
