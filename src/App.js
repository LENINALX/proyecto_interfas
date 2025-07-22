import { useState, useEffect } from "react";
import { FaHome, FaRoute, FaBicycle, FaTree, FaSearch, FaMapMarkerAlt, FaClock, FaStar, FaGlobe, FaKeyboard } from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [language, setLanguage] = useState("es");
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Traducciones
  const translations = {
    es: {
      // Navegación
      home: "Inicio",
      routes: "Rutas",
      cycling: "Ciclismo",
      parks: "Parques",
      search: "Buscar rutas, parques...",
      
      // Página de inicio
      welcome: "Bienvenido a Transporte",
      subtitle: "Tu compañero de viaje para explorar la ciudad",
      login: "Iniciar Sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      loginDev: "Funcionalidad de login en desarrollo",
      
      // Secciones
      transportRoutes: "Rutas de Transporte",
      cyclingRoutes: "Rutas de Ciclismo",
      parksSpaces: "Parques y Espacios Naturales",
      
      // Búsqueda
      searchResults: "Resultados de búsqueda para:",
      noResults: "No se encontraron resultados",
      
      // Botones
      select: "Seleccionar",
      selected: "Seleccionaste",
      seeAll: "Ver todas las rutas...",
      seeAllParks: "Ver todos los parques...",
      
      // Atajos de teclado
      shortcuts: "Atajos de Teclado",
      shortcutsList: {
        "Alt + H": "Ir a Inicio",
        "Alt + R": "Ver Rutas",
        "Alt + C": "Ver Ciclismo",
        "Alt + P": "Ver Parques",
        "Alt + S": "Buscar",
        "Alt + L": "Cambiar idioma",
        "Alt + K": "Mostrar atajos",
        "Escape": "Cerrar menús"
      }
    },
    en: {
      // Navigation
      home: "Home",
      routes: "Routes",
      cycling: "Cycling",
      parks: "Parks",
      search: "Search routes, parks...",
      
      // Home page
      welcome: "Welcome to Transport",
      subtitle: "Your travel companion to explore the city",
      login: "Sign In",
      email: "Email",
      password: "Password",
      loginDev: "Login functionality in development",
      
      // Sections
      transportRoutes: "Transport Routes",
      cyclingRoutes: "Cycling Routes",
      parksSpaces: "Parks and Natural Spaces",
      
      // Search
      searchResults: "Search results for:",
      noResults: "No results found",
      
      // Buttons
      select: "Select",
      selected: "You selected",
      seeAll: "See all routes...",
      seeAllParks: "See all parks...",
      
      // Keyboard shortcuts
      shortcuts: "Keyboard Shortcuts",
      shortcutsList: {
        "Alt + H": "Go to Home",
        "Alt + R": "View Routes",
        "Alt + C": "View Cycling",
        "Alt + P": "View Parks",
        "Alt + S": "Search",
        "Alt + L": "Change language",
        "Alt + K": "Show shortcuts",
        "Escape": "Close menus"
      }
    }
  };

  const t = translations[language];

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

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            setActiveTab("inicio");
            setMenuOpen(null);
            setShowSearch(false);
            break;
          case 'r':
            e.preventDefault();
            setActiveTab("rutas");
            setMenuOpen("rutas");
            setShowSearch(false);
            break;
          case 'c':
            e.preventDefault();
            setActiveTab("ciclismo");
            setMenuOpen("ciclismo");
            setShowSearch(false);
            break;
          case 'p':
            e.preventDefault();
            setActiveTab("parques");
            setMenuOpen("parques");
            setShowSearch(false);
            break;
          case 's':
            e.preventDefault();
            document.querySelector('.search-box input').focus();
            break;
          case 'l':
            e.preventDefault();
            setLanguage(language === 'es' ? 'en' : 'es');
            break;
          case 'k':
            e.preventDefault();
            setShowShortcuts(!showShortcuts);
            break;
          default:
            break;
        }
      }
      
      if (e.key === 'Escape') {
        setMenuOpen(null);
        setShowSearch(false);
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [language, showShortcuts]);

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

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
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
      <button className="action-btn" onClick={() => alert(`${t.selected} ${item.nombre}`)}>
        {t.select}
      </button>
    </div>
  );

  const renderShortcutsModal = () => (
    showShortcuts && (
      <div className="shortcuts-modal" onClick={() => setShowShortcuts(false)}>
        <div className="shortcuts-content" onClick={(e) => e.stopPropagation()}>
          <h3>{t.shortcuts}</h3>
          <div className="shortcuts-list">
            {Object.entries(t.shortcutsList).map(([key, description]) => (
              <div key={key} className="shortcut-item">
                <span className="shortcut-key">{key}</span>
                <span className="shortcut-description">{description}</span>
              </div>
            ))}
          </div>
          <button className="close-btn" onClick={() => setShowShortcuts(false)}>
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    )
  );

  const renderContent = () => {
    if (showSearch && searchTerm) {
      return (
        <section className="section">
          <h2>{t.searchResults} "{searchTerm}"</h2>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map(item => renderItemCard(item, 'search'))
            ) : (
              <p className="no-results">{t.noResults}</p>
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
              <h1>{t.welcome}</h1>
              <p>{t.subtitle}</p>
            </div>
            <div className="login-container">
              <h2>{t.login}</h2>
              <div className="login-form">
                <div className="input-group">
                  <input type="email" placeholder={t.email} required />
                </div>
                <div className="input-group">
                  <input type="password" placeholder={t.password} required />
                </div>
                <button 
                  className="login-btn"
                  onClick={() => alert(t.loginDev)}
                >
                  {t.login}
                </button>
              </div>
            </div>
          </section>
        );
      case "rutas":
        return (
          <section className="section">
            <h2>{t.transportRoutes}</h2>
            <div className="items-grid">
              {rutas.map(ruta => renderItemCard(ruta, 'ruta'))}
            </div>
          </section>
        );
      case "ciclismo":
        return (
          <section className="section">
            <h2>{t.cyclingRoutes}</h2>
            <div className="items-grid">
              {ciclismo.map(ruta => renderItemCard(ruta, 'ciclismo'))}
            </div>
          </section>
        );
      case "parques":
        return (
          <section className="section">
            <h2>{t.parksSpaces}</h2>
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
          <span className="logo-icon">🚌</span>
          Rutas de Transporte
        </div>
        
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
          </div>
        </div>

        <div className="navbar-actions">
          <button 
            className="icon-btn" 
            onClick={() => setShowShortcuts(true)}
            title={t.shortcuts}
          >
            <FaKeyboard />
          </button>
          <button 
            className="icon-btn language-btn" 
            onClick={toggleLanguage}
            title={language === 'es' ? 'English' : 'Español'}
          >
            <FaGlobe />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => toggleMenu("inicio")}
                className={activeTab === "inicio" ? "active" : ""}
              >
                <FaHome /> {t.home}
              </button>
            </li>
            <li className="dropdown">
              <button 
                onClick={() => toggleMenu("rutas")}
                className={activeTab === "rutas" ? "active" : ""}
              >
                <FaRoute /> {t.routes}
              </button>
              <ul className={`submenu ${menuOpen === "rutas" ? "show" : ""}`}>
                {rutas.slice(0, 5).map((r, i) => (
                  <li key={i} onClick={() => alert(`${t.selected} ${r.nombre}`)}>
                    {r.nombre}
                  </li>
                ))}
                <li className="more">{t.seeAll}</li>
              </ul>
            </li>
            <li className="dropdown">
              <button 
                onClick={() => toggleMenu("ciclismo")}
                className={activeTab === "ciclismo" ? "active" : ""}
              >
                <FaBicycle /> {t.cycling}
              </button>
              <ul className={`submenu ${menuOpen === "ciclismo" ? "show" : ""}`}>
                {ciclismo.map((r, i) => (
                  <li key={i} onClick={() => alert(`${t.selected} ${r.nombre}`)}>
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
                <FaTree /> {t.parks}
              </button>
              <ul className={`submenu ${menuOpen === "parques" ? "show" : ""}`}>
                {parques.slice(0, 5).map((p, i) => (
                  <li key={i} onClick={() => alert(`${t.selected} ${p.nombre}`)}>
                    {p.nombre}
                  </li>
                ))}
                <li className="more">{t.seeAllParks}</li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="main-content">
        {renderContent()}
      </main>
      
      {renderShortcutsModal()}
      
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

        .navbar-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .icon-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .icon-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }

        .language-btn {
          border-radius: 25px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: bold;
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

        .shortcuts-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .shortcuts-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          animation: slideIn 0.3s ease;
        }

        .shortcuts-content h3 {
          margin-top: 0;
          color: #333;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .shortcuts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .shortcut-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #4facfe;
        }

        .shortcut-key {
          background: #4facfe;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 5px;
          font-family: monospace;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .shortcut-description {
          color: #666;
          flex: 1;
          margin-left: 1rem;
        }

        .close-btn {
          width: 100%;
          margin-top: 1.5rem;
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79,172,254,0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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

          .navbar-actions {
            order: -1;
          }

          .shortcuts-content {
            width: 95%;
            padding: 1.5rem;
          }

          .shortcut-item {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .shortcut-description {
            margin-left: 0;
          }
        }
      }
      `}</style>
    </div>
  );
} 
export default App;