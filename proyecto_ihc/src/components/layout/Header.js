// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { FaHome, FaRoute, FaBiking, FaTree } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const [showRoutesDropdown, setShowRoutesDropdown] = useState(false);
  const [showCyclingDropdown, setShowCyclingDropdown] = useState(false);
  const [showParksDropdown, setShowParksDropdown] = useState(false);

  const closeAllDropdowns = () => {
    setShowRoutesDropdown(false);
    setShowCyclingDropdown(false);
    setShowParksDropdown(false);
  };

  const toggleRoutesDropdown = () => {
    closeAllDropdowns();
    setShowRoutesDropdown(prev => !prev);
  };
  const toggleCyclingDropdown = () => {
    closeAllDropdowns();
    setShowCyclingDropdown(prev => !prev);
  };
  const toggleParksDropdown = () => {
    closeAllDropdowns();
    setShowParksDropdown(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.navItem}`)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/home" className={styles.logo}>
          Rutas de Transporte
        </Link>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar rutas, parques..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.navLinks}>
          <Link
            to="/home"
            className={`${styles.navLink} ${location.pathname === '/home' ? styles.activeLink : ''}`}
            onClick={closeAllDropdowns}
          >
            <FaHome className={styles.navIcon} /> Inicio
          </Link>

          {/* Rutas */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleRoutesDropdown}
            onMouseLeave={toggleRoutesDropdown}
          >
            <Link
              to="/routes"
              className={`${styles.navLink} ${location.pathname.startsWith('/routes') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns}
            >
              <FaRoute className={styles.navIcon} /> Rutas
            </Link>
            {showRoutesDropdown && (
              <div className={styles.dropdownMenu}>
                {[1,2,3,4,5,7,8,9,10,11,12,14,15,16,17].map(num => (
                  <Link
                    key={num}
                    to={`/routes/${num}`}
                    className={styles.dropdownItem}
                    onClick={closeAllDropdowns}
                  >
                    Línea {num}
                  </Link>
                ))}
                <Link
                  to="/routes"
                  className={`${styles.dropdownItem} ${styles.viewAll}`}
                  onClick={closeAllDropdowns}
                >
                  Ver todas las rutas...
                </Link>
              </div>
            )}
          </div>

          {/* Ciclismo */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleCyclingDropdown}
            onMouseLeave={toggleCyclingDropdown}
          >
            <Link
              to="/cycling"
              className={`${styles.navLink} ${location.pathname.startsWith('/cycling') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns}
            >
              <FaBiking className={styles.navIcon} /> Ciclismo
            </Link>
            {showCyclingDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/cycling/cicloruta-rio" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Cicloruta del Río
                </Link>
                <Link to="/cycling/cicloruta-urbana" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Cicloruta Urbana
                </Link>
                <Link to="/cycling/cicloruta-montanosa" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Cicloruta Montañosa
                </Link>
              </div>
            )}
          </div>

          {/* Parques */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleParksDropdown}
            onMouseLeave={toggleParksDropdown}
          >
            <Link
              to="/parks"
              className={`${styles.navLink} ${location.pathname.startsWith('/parks') ? styles.activeLink : ''}`}
              onClick={closeAllDropdowns}
            >
              <FaTree className={styles.navIcon} /> Parques
            </Link>
            {showParksDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/parks/parque-central" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Parque Central
                </Link>
                <Link to="/parks/parque-lago" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Parque del Lago
                </Link>
                <Link to="/parks/parque-infantil" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Parque Infantil
                </Link>
                <Link to="/parks/parque-ecologico" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Parque Ecológico
                </Link>
                <Link to="/parks/parque-deportivo" className={styles.dropdownItem} onClick={closeAllDropdowns}>
                  Parque Deportivo
                </Link>
                <Link
                  to="/parks"
                  className={`${styles.dropdownItem} ${styles.viewAll}`}
                  onClick={closeAllDropdowns}
                >
                  Ver todos los parques...
                </Link>
              </div>
            )}
          </div>

          {/* Sesión / Admin */}
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className={styles.navLink} onClick={closeAllDropdowns}>
                  Panel Admin
                </Link>
              )}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.navLink} onClick={closeAllDropdowns}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
