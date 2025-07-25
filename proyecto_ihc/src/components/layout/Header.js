import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { FaHome, FaRoute, FaBiking, FaTree } from 'react-icons/fa';
import routes from '../../data/routesData';
import cyclingData from '../../data/cyclingData';

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
    setShowRoutesDropdown(v => !v);
  };
  const toggleCyclingDropdown = () => {
    closeAllDropdowns();
    setShowCyclingDropdown(v => !v);
  };
  const toggleParksDropdown = () => {
    closeAllDropdowns();
    setShowParksDropdown(v => !v);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = e => {
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
        {/* Logo */}
        <Link to="/home" className={styles.logo}>
          Rutas de Transporte
        </Link>

        {/* Buscador */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar rutas, parques..."
            className={styles.searchInput}
          />
        </div>

        {/* Enlaces de navegación */}
        <div className={styles.navLinks}>
          <Link
            to="/home"
            className={`${styles.navLink} ${
              location.pathname === '/home' ? styles.activeLink : ''
            }`}
            onClick={closeAllDropdowns}
          >
            <FaHome className={styles.navIcon} /> Inicio
          </Link>

          {/* Dropdown Rutas */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleRoutesDropdown}
            onMouseLeave={toggleRoutesDropdown}
          >
            <Link
              to="/routes"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/routes') ? styles.activeLink : ''
              }`}
              onClick={closeAllDropdowns}
            >
              <FaRoute className={styles.navIcon} /> Rutas
            </Link>
            {showRoutesDropdown && (
              <div className={styles.dropdownMenu}>
                {routes.map(r => (
                  <Link
                    key={r.id}
                    to={`/routes/${r.id}`}
                    className={styles.dropdownItem}
                    onClick={closeAllDropdowns}
                  >
                    {r.name}
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

          {/* Dropdown Ciclismo */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleCyclingDropdown}
            onMouseLeave={toggleCyclingDropdown}
          >
            <Link
              to="/cycling"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/cycling') ? styles.activeLink : ''
              }`}
              onClick={closeAllDropdowns}
            >
              <FaBiking className={styles.navIcon} /> Ciclismo
            </Link>
            {showCyclingDropdown && (
              <div className={styles.dropdownMenu}>
                {cyclingData.map(c => (
                  <Link
                    key={c.id}
                    to={`/cycling/${c.id}`}
                    className={styles.dropdownItem}
                    onClick={closeAllDropdowns}
                  >
                    Ruta ciclismo {c.id}
                  </Link>
                ))}
                <Link
                  to="/cycling"
                  className={`${styles.dropdownItem} ${styles.viewAll}`}
                  onClick={closeAllDropdowns}
                >
                  Ver todas las rutas de ciclismo...
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown Parques */}
          <div
            className={styles.navItem}
            onMouseEnter={toggleParksDropdown}
            onMouseLeave={toggleParksDropdown}
          >
            <Link
              to="/parks"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/parks') ? styles.activeLink : ''
              }`}
              onClick={closeAllDropdowns}
            >
              <FaTree className={styles.navIcon} /> Parques
            </Link>
            {showParksDropdown && (
              <div className={styles.dropdownMenu}>
                <Link
                  to="/parks/parque-central"
                  className={styles.dropdownItem}
                  onClick={closeAllDropdowns}
                >
                  Parque Central
                </Link>
                <Link
                  to="/parks/parque-lago"
                  className={styles.dropdownItem}
                  onClick={closeAllDropdowns}
                >
                  Parque del Lago
                </Link>
                <Link
                  to="/parks/parque-infantil"
                  className={styles.dropdownItem}
                  onClick={closeAllDropdowns}
                >
                  Parque Infantil
                </Link>
                <Link
                  to="/parks/parque-ecologico"
                  className={styles.dropdownItem}
                  onClick={closeAllDropdowns}
                >
                  Parque Ecológico
                </Link>
                <Link
                  to="/parks/parque-deportivo"
                  className={styles.dropdownItem}
                  onClick={closeAllDropdowns}
                >
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
                <Link
                  to="/admin/dashboard"
                  className={styles.navLink}
                  onClick={closeAllDropdowns}
                >
                  Panel Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={styles.navLink}
              onClick={closeAllDropdowns}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
