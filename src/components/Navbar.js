import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";

function Navbar() {
  /* const navigate = useNavigate();*/

  return (
    <nav className="Navbar">
      <div style={{ fontSize: '24px', color: 'white' }}>  
        <Link to="/volleyball-matches" style={{ color: 'white' }}>
          CV Torrent - Partidos
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
