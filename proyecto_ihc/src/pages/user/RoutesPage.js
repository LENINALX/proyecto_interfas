import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../data/routesData';
import styles from './RoutesPage.module.css';

export default function RoutesPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Rutas Disponibles</h1>
      <div className={styles.cardGrid}>
        {routes.map((route) => (
          <div
            key={route.id}
            className={styles.card}
            onClick={() => navigate(`/routes/${route.id}`)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>🚌</span>
              <h2 className={styles.title}>{route.name}</h2>
            </div>
            <p className={styles.description}>{route.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
