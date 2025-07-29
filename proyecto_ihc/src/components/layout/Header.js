import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { FaHome, FaRoute, FaBiking, FaTree, FaMapMarkerAlt } from 'react-icons/fa';
import routes from '../../data/routesData';
import cyclingData from '../../data/cyclingData';
import SuggestRouteForm from '../forms/SuggestRouteForm';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Estado del drawer de sugerir ruta
  const [showSuggest, setShowSuggest] = useState(false);

  // Dropdowns
  const [showRoutesDropdown, setShowRoutesDropdown] = useState(false);
  const [showCyclingDropdown, setShowCyclingDropdown] = useState(false);
  const [showParksDropdown, setShowParksDropdown] = useState(false);

  // Búsqueda
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef();

  const closeAll = () => {
    setShowRoutesDropdown(false);
    setShowCyclingDropdown(false);
    setShowParksDropdown(false);
    setSuggestions([]);
  };

  // Cerrar dropdowns y sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = e => {
      if (
        !e.target.closest(`.${styles.navItem}`) &&
        !e.target.closest(`.${styles.searchBar}`)
      ) {
        closeAll();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Actualizar sugerencias al escribir
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      return;
    }
    const all = [
      ...routes.map(r => ({ type: 'Autobús', label: r.name, path: `/routes/${r.id}` })),
      ...cyclingData.map(c => ({ type: 'Ciclismo', label: c.title, path: `/cycling/${c.id}` })),
    ];
    setSuggestions(
      all.filter(item => item.label.toLowerCase().includes(q)).slice(0, 5)
    );
  }, [query]);

  const onSelect = path => {
    setQuery('');
    setSuggestions([]);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>

        {/* Botón sugerir ruta */}
        <button
          className={styles.navIconBtn}
          onClick={() => setShowSuggest(true)}
          title="Sugerir nueva ruta"
        >
          <FaMapMarkerAlt size={20} color="#fff" />
        </button>
        

        {/* Logo modificado con emoji */}
        <Link to="/home" className={styles.logo}>
          <span role="img" aria-label="ubicación">📍</span> Inicio
        </Link>

        {/* Nuevo enlace de sugerencias */}
        <Link
          to="/suggestions"
          className={`${styles.navLink} ${location.pathname.startsWith('/suggestions') ? styles.activeLink : ''} ${styles.suggestionsLink}`}
        >
          <span role="img" aria-label="ideas">💡</span> Sugerencias
        </Link>

        {/* Buscador */}
        <div className={styles.searchBar} ref={searchRef}>
          <input
            type="text"
            placeholder="Buscar rutas, ciclismo..."
            className={styles.searchInput}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className={styles.searchSuggestions}>
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className={styles.suggestionItem}
                  onClick={() => onSelect(s.path)}
                >
                  <span className={styles.suggestionType}>{s.type}</span> {s.label}
                </li>
              ))}
              <li
                className={`${styles.suggestionItem} ${styles.viewAll}`}
                onClick={() =>
                  onSelect(suggestions[0].type === 'Autobús' ? '/routes' : '/cycling')
                }
              >
                Ver todos los resultados...
              </li>
            </ul>
          )}
        </div>

        {/* Enlaces de navegación */}
        <div className={styles.navLinks}>
          <Link
            to="/home"
            className={`${styles.navLink} ${
              location.pathname === '/home' ? styles.activeLink : ''
            }`}
            onClick={closeAll}
          >
            <FaHome className={styles.navIcon} /> Inicio
          </Link>

          {/* Dropdown Rutas */}
          <div
            className={styles.navItem}
            onMouseEnter={() => { closeAll(); setShowRoutesDropdown(true); }}
            onMouseLeave={() => setShowRoutesDropdown(false)}
          >
            <Link
              to="/routes"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/routes') ? styles.activeLink : ''
              }`}
              onClick={closeAll}
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
                    onClick={closeAll}
                  >
                    {r.name}
                  </Link>
                ))}
                <Link
                  to="/routes"
                  className={`${styles.dropdownItem} ${styles.viewAll}`}
                  onClick={closeAll}
                >
                  Ver todas las rutas...
                </Link>
                <Link
                  to="/suggestions"
                  className={styles.naVgLink}
                  onClick={closeAll}
                >
                   📝 Sugerencias
                </Link> 
              </div>
            )}
          </div>

          {/* Dropdown Ciclismo */}
          <div
            className={styles.navItem}
            onMouseEnter={() => { closeAll(); setShowCyclingDropdown(true); }}
            onMouseLeave={() => setShowCyclingDropdown(false)}
          >
            <Link
              to="/cycling"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/cycling') ? styles.activeLink : ''
              }`}
              onClick={closeAll}
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
                    onClick={closeAll}
                  >
                    Ruta ciclismo {c.id}
                  </Link>
                ))}
                <Link
                  to="/cycling"
                  className={`${styles.dropdownItem} ${styles.viewAll}`}
                  onClick={closeAll}
                >
                  Ver todas las rutas de ciclismo...
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown Parques */}
          <div
            className={styles.navItem}
            onMouseEnter={() => { closeAll(); setShowParksDropdown(true); }}
            onMouseLeave={() => setShowParksDropdown(false)}
          >
            <Link
              to="/parks"
              className={`${styles.navLink} ${
                location.pathname.startsWith('/parks') ? styles.activeLink : ''
              }`}
              onClick={closeAll}
            >
              <FaTree className={styles.navIcon} /> Parques
            </Link>
            {showParksDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/parks/parque-central" className={styles.dropdownItem} onClick={closeAll}>
                  Parque Central
                </Link>
                <Link to="/parks/parque-lago" className={styles.dropdownItem} onClick={closeAll}>
                  Parque del Lago
                </Link>
                <Link to="/parks/parque-infantil" className={styles.dropdownItem} onClick={closeAll}>
                  Parque Infantil
                </Link>
                <Link to="/parks/parque-ecologico" className={styles.dropdownItem} onClick={closeAll}>
                  Parque Ecológico
                </Link>
                <Link to="/parks/parque-deportivo" className={styles.dropdownItem} onClick={closeAll}>
                  Parque Deportivo
                </Link>
                <Link to="/parks" className={`${styles.dropdownItem} ${styles.viewAll}`} onClick={closeAll}>
                  Ver todos los parques...
                </Link>
              </div>
            )}
          </div>

          {/* Sesión / Admin */}
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className={styles.navLink} onClick={closeAll}>
                  Panel Admin
                </Link>
              )}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.navLink} onClick={closeAll}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>

      {/* Drawer del formulario */}
      <SuggestRouteForm
        isOpen={showSuggest}
        onClose={() => setShowSuggest(false)}
      />
    </header>
  );
};

export default Header;
