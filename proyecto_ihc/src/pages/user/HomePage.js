// src/pages/user/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import mapaManta from '../../assets/mapa_manta.png'; // <-- ¡Asegúrate que el nombre de la imagen coincida!

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeTitle}>Bienvenido a Transporte</h1> {/* */}
      <p className={styles.welcomeSubtitle}>Tu compañero de viaje para explorar la ciudad</p> {/* */}

      {user && (
        <div className={styles.loggedInSection}>
          <h2 className={styles.loggedInMessage}>¡Hola, {user.username}!</h2>
          <p className={styles.thankYouMessage}>Gracias por utilizar nuestra plataforma para explorar Manta.</p>
        </div>
      )}

      {/* Información de Manta - Horarios, rutas y paradas */}
      <div className={styles.infoSection}>
        <h3 className={styles.infoTitle}>Manta - Horarios, rutas y paradas</h3> {/* */}
        <div className={styles.infoContent}>
          <p>Manta es un proveedor de transporte público en Manta que opera rutas de autobús.</p>
          <p>Manta tiene 14 rutas de autobús en Manta con 716 paradas de autobús.</p>
          <p>Sus rutas de autobús cubren un área desde el Norte de (Manta) con una parada en Avenida Circunvalación Manta hasta el sur de (Montecristi) con una parada en Manta. Su parada más al oeste es Manta (Manta) y la parada más al este es Manta-Colisa Parroquia Jaramijó (Jaramijo).</p>
          <p>Los horarios de las líneas de Manta (horarios, itinerarios, horas de servicio) y los horarios de salida y llegada a las paradas se actualizan en la aplicación en tiempo real.</p>
        </div>
      </div>

      {/* Mapa del área de cobertura de Manta */}
      <div className={styles.mapSection}>
        <h3 className={styles.mapTitle}>Mapa del área de cobertura de Manta</h3> {/* */}
        <img src={mapaManta} alt="Mapa del área de cobertura de Manta" className={styles.mapImage} />
      </div>

      <div className={styles.actionLinks}>
        <p>Explora nuestras <Link to="/routes" className={styles.link}>Rutas</Link>, <Link to="/cycling" className={styles.link}>Ciclismo</Link> y <Link to="/parks" className={styles.link}>Parques</Link>.</p>
      </div>
    </div>
  );
};

export default HomePage;