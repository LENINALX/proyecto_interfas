import { useState } from "react";
import { FaHome, FaRoute, FaBicycle, FaTree, FaSearch, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const rutas = [
    { id: 1, nombre: "Linea 1", descripcion: "Ciudadela 15 de abril - Los Gavilanes", duracion: "81 min", distancia: "2.5 km", rating: "4.5" },
    { id: 2, nombre: "Linea 2", descripcion: "Parque del Recuerdo - Ciudadela Deportiva", duracion: "44 min", distancia: "3.2 km", rating: "4.3" },
    { id: 3, nombre: "Linea 3", descripcion: "Urbirrios II - Ciudadela Deportiva", duracion: "46 min", distancia: "4.1 km", rating: "4.4" },
    { id: 4, nombre: "Linea 4", descripcion: "La Pradera - Ciudadela Deportiva", duracion: "36 min", distancia: "2.8 km", rating: "4.2" },
    { id: 5, nombre: "Linea 5", descripcion: "Conecta con el aeropuerto y zona hotelera", duracion: "35 min", distancia: "6.5 km", rating: "4.6" },
    { id: 6, nombre: "Linea 6", descripcion: "Servicio rápido sin paradas intermedias", duracion: "12 min", distancia: "4.8 km", rating: "4.7" },
    { id: 7, nombre: "Linea 7", descripcion: "Ciudadela Nueva Esperanza - Agencia Municipal de Tránsito", duracion: "43 min", distancia: "3.5 km", rating: "4.1" },
    { id: 8, nombre: "Linea 8", descripcion: "Ciudadela Deportiva - Leónidas Proaño", duracion: "45 min", distancia: "8.2 km", rating: "4.8" },
    { id: 9, nombre: "Linea 9", descripcion: "Ciudadela Deportiva - Ciudadela Costa Azul", duracion: "41 min", distancia: "5.1 km", rating: "4.5" },
    { id: 10, nombre: "Linea 10", descripcion: "Ciudadela Deportiva - Cielito Lindo", duracion: "48 min", distancia: "2.9 km", rating: "4.3" },
    { id: 11, nombre: "Linea 11", descripcion: "Ciudadela Deportiva - La Revancha", duracion: "50 min", distancia: "2.1 km", rating: "4.4" },
    { id: 12, nombre: "Linea 12", descripcion: "Ciudadela Deportiva - La Cumbres", duracion: "30 min", distancia: "4.6 km", rating: "4.2" },
    { id: 13, nombre: "Linea 13", descripcion: "Conecta estadios y centros deportivos", duracion: "24 min", distancia: "3.8 km", rating: "4.3" },
    { id: 14, nombre: "Linea 14", descripcion: "Ciudadela Deportiva - Cosase", duracion: "40 min", distancia: "6.8 km", rating: "4.6" },
    { id: 15, nombre: "Linea 15", descripcion: "Ciudadela los Geranios - San Juan", duracion: "36 min", distancia: "4.2 km", rating: "4.4" },
    { id: 16, nombre: "Linea 16", descripcion: "Ciudadela Deportiva - Ciudadela Montalván", duracion: "38 min", distancia: "7.5 km", rating: "4.7" },
    { id: 17, nombre: "Linea 17", descripcion: "Nuevo Terminal Terrestre - Ciudadela Deportiva", duracion: "31 min", distancia: "9.3 km", rating: "4.9" }
  ];

  const ciclismo = [
    { id: 1, nombre: "Cicloruta del Río", descripcion: "Sendero junto al río con paisajes naturales", duracion: "30 min", distancia: "5.2 km", rating: "4.6" },
    { id: 2, nombre: "Cicloruta Urbana", descripcion: "Recorrido seguro por el centro de la ciudad", duracion: "25 min", distancia: "4.8 km", rating: "4.4" },
    { id: 3, nombre: "Cicloruta Montañosa", descripcion: "Desafío para ciclistas experimentados", duracion: "65 min", distancia: "12.5 km", rating: "4.8" }
  ];

  const parques = [
    { id: 1, nombre: "Parque Central", descripcion: "Corazón verde de la ciudad con fuentes y jardines", duracion: "45 min", distancia: "1.2 km", rating: "4.7" },
    { id: 2, nombre: "Parque del Lago", descripcion: "Hermoso lago con actividades acuáticas", duracion: "60 min", distancia: "2.1 km", rating: "4.8" },
    { id: 3, nombre: "Parque Infantil", descripcion: "Área recreativa especializada para niños", duracion: "90 min", distancia: "0.8 km", rating: "4.5" },
    { id: 4, nombre: "Parque Ecológico", descripcion: "Reserva natural con senderos interpretativos", duracion: "120 min", distancia: "3.5 km", rating: "4.9" },
    { id: 5, nombre: "Parque Deportivo", descripcion: "Canchas y espacios para actividades físicas", duracion: "75 min", distancia: "1.8 km", rating: "4.4" },
    { id: 6, nombre: "Parque Botánico", descripcion: "Jardín botánico con especies nativas", duracion: "100 min", distancia: "2.8 km", rating: "4.6" },
    { id: 7, nombre: "Parque Histórico", descripcion: "Sitio con valor histórico y cultural", duracion: "80 min", distancia: "1.5 km", rating: "4.5" },
    { id: 8, nombre: "Parque Lineal", descripcion: "Sendero verde que atraviesa la ciudad", duracion: "40 min", distancia: "4.2 km", rating: "4.3" },
    { id: 9, nombre: "Parque Aventura", descripcion: "Actividades extremas y tirolinas", duracion: "180 min", distancia: "2.5 km", rating: "4.7" },
    { id: 10, nombre: "Parque Mirador", descripcion: "Vista panorámica de toda la región", duracion: "50 min", distancia: "1.9 km", rating: "4.8" }
  ];

  const toggleMenu = (menu) => {
    setMenuOpen(menuOpen === menu ? null : menu);
    setActiveTab(menu);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const allItems = [...rutas, ...ciclismo, ...parques];
      const filtered = allItems.filter(item => 
        item.nombre.toLowerCase().includes(term.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const renderItemCard = (item, type) => (
    <div key={item.id} className="item-card">
      <div className="item-header">
        <h3>{item.nombre}</h3>
        <div className="rating">
          <FaStar className="star" />
          <span>{item.rating}</span>
        </div>
      </div>
      <p className="item-description">{item.descripcion}</p>
      <div className="item-details">
        <div className="detail">
          <FaClock className="icon" />
          <span>{item.duracion}</span>
        </div>
        <div className="detail">
          <FaMapMarkerAlt className="icon" />
          <span>{item.distancia}</span>
        </div>
      </div>
      <button className="action-btn" onClick={() => alert(`Seleccionaste ${item.nombre}`)}>
        Seleccionar
      </button>
    </div>
  );

  const renderContent = () => {
    if (showSearch && searchTerm) {
      return (
        <section className="section">
          <h2>Resultados de búsqueda para: "{searchTerm}"</h2>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map(item => renderItemCard(item, 'search'))
            ) : (
              <p className="no-results">No se encontraron resultados</p>
            )}
          </div>
        </section>
      );
    }

    switch (activeTab) {
      case "inicio":
        return (
          <section className="section">
            <div className="hero">
              <h1>Bienvenido a Transporte</h1>
              <p>Tu compañero de viaje para explorar la ciudad</p>
            </div>
            <div className="login-container">
              <h2>Iniciar Sesión</h2>
              <div className="login-form">
                <div className="input-group">
                  <input type="email" placeholder="Correo electrónico" required />
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Contraseña" required />
                </div>
                <button 
                  className="login-btn"
                  onClick={() => alert('Funcionalidad de login en desarrollo')}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </section>
        );
      case "rutas":
        return (
          <section className="section">
            <h2>Rutas de Transporte</h2>
            <div className="items-grid">
              {rutas.map(ruta => renderItemCard(ruta, 'ruta'))}
            </div>
          </section>
        );
      case "ciclismo":
        return (
          <section className="section">
            <h2>Rutas de Ciclismo</h2>
            <div className="items-grid">
              {ciclismo.map(ruta => renderItemCard(ruta, 'ciclismo'))}
            </div>
          </section>
        );
      case "parques":
        return (
          <section className="section">
            <h2>Parques y Espacios Naturales</h2>
            <div className="items-grid">
              {parques.map(parque => renderItemCard(parque, 'parque'))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon"></span>
          Rutas de Transporte
        </div>
        
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar rutas, parques..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => toggleMenu("inicio")}
                className={activeTab === "inicio" ? "active" : ""}
              >
                <FaHome /> Inicio
              </button>
            </li>
            <li className="dropdown">
              <button 
                onClick={() => toggleMenu("rutas")}
                className={activeTab === "rutas" ? "active" : ""}
              >
                <FaRoute /> Rutas
              </button>
              <ul className={`submenu ${menuOpen === "rutas" ? "show" : ""}`}>
                {rutas.slice(0, 5).map((r, i) => (
                  <li key={i} onClick={() => alert(`Seleccionaste ${r.nombre}`)}>
                    {r.nombre}
                  </li>
                ))}
                <li className="more">Ver todas las rutas...</li>
              </ul>
            </li>
            <li className="dropdown">
              <button 
                onClick={() => toggleMenu("ciclismo")}
                className={activeTab === "ciclismo" ? "active" : ""}
              >
                <FaBicycle /> Ciclismo
              </button>
              <ul className={`submenu ${menuOpen === "ciclismo" ? "show" : ""}`}>
                {ciclismo.map((r, i) => (
                  <li key={i} onClick={() => alert(`Seleccionaste ${r.nombre}`)}>
                    {r.nombre}
                  </li>
                ))}
              </ul>
            </li>
            <li className="dropdown">
              <button 
                onClick={() => toggleMenu("parques")}
                className={activeTab === "parques" ? "active" : ""}
              >
                <FaTree /> Parques
              </button>
              <ul className={`submenu ${menuOpen === "parques" ? "show" : ""}`}>
                {parques.slice(0, 5).map((p, i) => (
                  <li key={i} onClick={() => alert(`Seleccionaste ${p.nombre}`)}>
                    {p.nombre}
                  </li>
                ))}
                <li className="more">Ver todos los parques...</li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="main-content">
        {renderContent()}
      </main>
      
      <style jsx>{`
        .App {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Arial', sans-serif;
        }

        .navbar {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
          margin: 0 2rem;
        }

        .search-box {
          position: relative;
          width: 100%;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: none;
          border-radius: 25px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          outline: none;
          background: white;
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
          transform: scale(1.02);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-size: 1.1rem;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 1rem;
          margin: 0;
          padding: 0;
        }

        .nav-links button {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-links button:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .nav-links button.active {
          background: rgba(255,255,255,0.3);
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .dropdown {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          min-width: 200px;
          list-style: none;
          padding: 0;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .submenu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .submenu li {
          padding: 0.75rem 1rem;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid #eee;
        }

        .submenu li:hover {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .submenu li.more {
          font-weight: bold;
          color: #4facfe;
          border-bottom: none;
        }

        .submenu li:first-child {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }

        .submenu li:last-child {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom: none;
        }

        .main-content {
          padding: 2rem;
        }

        .section {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero h1 {
          font-size: 3rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          color: #666;
        }

        .login-container {
          max-width: 400px;
          margin: 0 auto;
        }

        .login-container h2 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          border-color: #4facfe;
          box-shadow: 0 0 10px rgba(79,172,254,0.3);
        }

        .login-btn {
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79,172,254,0.4);
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .item-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border-color: #4facfe;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .item-header h3 {
          color: #333;
          margin: 0;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #ffa500;
        }

        .star {
          color: #ffa500;
        }

        .item-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .item-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
        }

        .detail .icon {
          color: #4facfe;
        }

        .action-btn {
          width: 100%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102,126,234,0.4);
        }

        .search-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .no-results {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 1rem;
          }
          
          .search-container {
            margin: 0;
            max-width: 100%;
          }
          
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .items-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;