import React from 'react';
import { useNavigate } from 'react-router-dom';
import cyclingData from '../../data/cyclingData';
import styles from './CyclingPage.module.css';

export default function CyclingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🚴‍♂️ Rutas de Ciclismo</h1>
      <div className={styles.grid}>
        {cyclingData.map(route => (
          <div
            key={route.id}
            className={styles.card}
            onClick={() => navigate(`/cycling/${route.id}`)}
          >
            <img
              src={route.img}
              alt={route.title}
              className={styles.thumbnail}
            />
            <div className={styles.cardHeader}>
              <span className={styles.bikeIcon}>🚲</span>
              <h2 className={styles.title}>{route.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
