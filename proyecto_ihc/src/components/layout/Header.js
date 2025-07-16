// src/components/layout/Header.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
// Importa los íconos de Font Awesome
import { FaHome, FaRoute, FaBiking, FaTree } from 'react-icons/fa'; //

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para saber la ruta actual y aplicar estilos 'active'
  const user = JSON.parse(localStorage.getItem('user'));

  // Estado para controlar la visibilidad de los dropdowns
  const [showRoutesDropdown, setShowRoutesDropdown] = useState(false);
  const [showCyclingDropdown, setShowCyclingDropdown] = useState(false);
  const [showParksDropdown, setShowParksDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Función para cerrar todos los dropdowns
  const closeAllDropdowns = () => {
    setShowRoutesDropdown(false);
    setShowCyclingDropdown(false);
    setShowParksDropdown(false);
  };

  // Manejadores para abrir/cerrar dropdowns
  const toggleRoutesDropdown = () => { closeAllDropdowns(); setShowRoutesDropdown(prev => !prev); };
  const toggleCyclingDropdown = () => { closeAllDropdowns(); setShowCyclingDropdown(prev => !prev); };
  const toggleParksDropdown = () => { closeAllDropdowns(); setShowParksDropdown(prev => !prev); };

  // Cerrar dropdowns al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(`.${styles.navItem}`) === null) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/home" className={styles.logo}>Rutas de Transporte</Link>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Buscar rutas, parques..." className={styles.searchInput} />
        </div>
        <div className={styles.navLinks}>
          <Link
            to="/home"
            className={`${styles.navLink} ${location.pathname === '/home' ? styles.activeLink : ''}`}
            onClick={closeAllDropdowns}
          >
            <FaHome className={styles.navIcon} /> Inicio
          </Link>

          <div className={styles.navItem} onMouseEnter={toggleRoutesDropdown} onMouseLeave={toggleRoutesDropdown}>
            <Link
              to="/routes"
              className={`${styles.navLink} ${location.pathname.startsWith('/routes') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns} // Cierra al hacer clic si no hay hover
            >
              <FaRoute className={styles.navIcon} /> Rutas
            </Link>
            {showRoutesDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/routes/linea1" className={styles.dropdownItem} onClick={closeAllDropdowns}>Línea 1</Link>
                <Link to="/routes/linea2" className={styles.dropdownItem} onClick={closeAllDropdowns}>Línea 2</Link>
                <Link to="/routes/linea3" className={styles.dropdownItem} onClick={closeAllDropdowns}>Línea 3</Link>
                <Link to="/routes/linea4" className={styles.dropdownItem} onClick={closeAllDropdowns}>Línea 4</Link>
                <Link to="/routes/linea5" className={styles.dropdownItem} onClick={closeAllDropdowns}>Línea 5</Link>
                <Link to="/routes" className={`${styles.dropdownItem} ${styles.viewAll}`} onClick={closeAllDropdowns}>Ver todas las rutas...</Link>
              </div>
            )}
          </div>

          <div className={styles.navItem} onMouseEnter={toggleCyclingDropdown} onMouseLeave={toggleCyclingDropdown}>
            <Link
              to="/cycling"
              className={`${styles.navLink} ${location.pathname.startsWith('/cycling') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns}
            >
              <FaBiking className={styles.navIcon} /> Ciclismo
            </Link>
            {showCyclingDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/cycling/cicloruta-rio" className={styles.dropdownItem} onClick={closeAllDropdowns}>Cicloruta del Río</Link>
                <Link to="/cycling/cicloruta-urbana" className={styles.dropdownItem} onClick={closeAllDropdowns}>Cicloruta Urbana</Link>
                <Link to="/cycling/cicloruta-montanosa" className={styles.dropdownItem} onClick={closeAllDropdowns}>Cicloruta Montañosa</Link>
              </div>
            )}
          </div>

          <div className={styles.navItem} onMouseEnter={toggleParksDropdown} onMouseLeave={toggleParksDropdown}>
            <Link
              to="/parks"
              className={`${styles.navLink} ${location.pathname.startsWith('/parks') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns}
            >
              <FaTree className={styles.navIcon} /> Parques
            </Link>
            {showParksDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/parks/parque-central" className={styles.dropdownItem} onClick={closeAllDropdowns}>Parque Central</Link>
                <Link to="/parks/parque-lago" className={styles.dropdownItem} onClick={closeAllDropdowns}>Parque del Lago</Link>
                <Link to="/parks/parque-infantil" className={styles.dropdownItem} onClick={closeAllDropdowns}>Parque Infantil</Link>
                <Link to="/parks/parque-ecologico" className={styles.dropdownItem} onClick={closeAllDropdowns}>Parque Ecológico</Link>
                <Link to="/parks/parque-deportivo" className={styles.dropdownItem} onClick={closeAllDropdowns}>Parque Deportivo</Link>
                <Link to="/parks" className={`${styles.dropdownItem} ${styles.viewAll}`} onClick={closeAllDropdowns}>Ver todos los parques...</Link>
              </div>
            )}
          </div>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className={styles.navLink} onClick={closeAllDropdowns}>Panel Admin</Link>
              )}
              <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
            </>
          ) : (
            <Link to="/login" className={styles.navLink} onClick={closeAllDropdowns}>Iniciar Sesión</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;