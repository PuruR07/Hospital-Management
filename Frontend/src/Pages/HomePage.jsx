import '../assets/StyleSheets/HomePage.css';
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="homepage-container">
        <h1>Welcome to XYZ Hospital</h1>

        <div className="dashboard-cards">
          <div className="card">
            <h2>Doctors</h2>
            <Link to={'doctor'}className="btn-link">View All</Link>
          </div>

          <div className="card">
            <h2>Patients</h2>
            <Link to={'patient'}className="btn-link">View All</Link>
          </div>

          <div className="card">
            <h2>Appointments</h2>
            <Link to={'/appointment'} className='btn-link'>Manage</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
