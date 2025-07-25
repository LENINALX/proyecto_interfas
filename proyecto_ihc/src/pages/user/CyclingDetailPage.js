import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cyclingData from '../../data/cyclingData';
import styles from './CyclingDetailPage.module.css';

export default function CyclingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = cyclingData.find(r => r.id === Number(id));

  if (!route) {
    return <p className={styles.notFound}>Ruta no encontrada.</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <h1 className={styles.title}>🚴 {route.title}</h1>

      <div className={styles.stats}>
        <div><span className={styles.statIcon}>⏱️</span> Duración: {route.duration}</div>
        <div><span className={styles.statIcon}>↔️</span> Distancia: {route.distance}</div>
        <div><span className={styles.statIcon}>⚡</span> Vel. promedio: {route.avgSpeed}</div>
        <div><span className={styles.statIcon}>⛰️</span> Desnivel: {route.ascent}</div>
        <div><span className={styles.statIcon}>🚩</span> Dificultad: {route.difficulty}</div>
      </div>

      <div className={styles.mapWrapper}>
        <img
          src={route.img}
          alt={`Mapa de ${route.title}`}
          className={styles.map}
        />
      </div>
    </div>
  );
}
