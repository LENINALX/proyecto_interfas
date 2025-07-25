// src/pages/user/RouteDetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import routes from '../../data/routesData';
import styles from './RouteDetailPage.module.css';

export default function RouteDetailPage() {
  const { id } = useParams();
  const routeId = Number(id);
  const navigate = useNavigate();
  const route = routes.find(r => r.id === routeId);

  if (!route) {
    return (
      <div className={styles.notFound}>
        <p>Ruta no encontrada.</p>
        <button
          onClick={() => navigate('/routes')}
          className={styles.backButton}
        >
          ← Volver a Rutas
        </button>
      </div>
    );
  }

  // Textos de información por línea
  const infoTextMap = {
    1: [
      'La primera parada de la línea 1 de autobús es Manta y la última parada es Manta. La línea 1 (Ciudadela 15 de Abril – Los Gavilanes) está operativa todos los días.',
      'Información adicional: la línea 1 tiene 71 paradas y la duración total del viaje para esta ruta es de aproximadamente 81 minutos.'
    ],
    2: [
      'La primera parada de la línea 2 de autobús es Manta-Colisa Parroquia Jaramijó y la última parada es Calle 12 Manta. La línea 2 (Parque del Recuerdo – Ciudadela Deportiva) está operativa todos los días.',
      'Información adicional: la línea 2 tiene 40 paradas y la duración total del viaje para esta ruta es de aproximadamente 44 minutos.'
    ],
    3: [
      'La primera parada de la línea 3 de autobús es E15 Manta y la última parada es Manta. La línea 3 (Urbirrios II – Ciudadela Deportiva) está operativa todos los días.',
      'Información adicional: la línea 3 tiene 43 paradas y la duración total del viaje para esta ruta es de aproximadamente 46 minutos.'
    ],
    4: [
      'La primera parada de la línea 4 de autobús es E15 Manta y la última parada es Manta. La línea 4 (La Pradera – Ciudadela Deportiva) está operativa todos los días.',
      'Información adicional: la línea 4 tiene 34 paradas y la duración total del viaje para esta ruta es de aproximadamente 36 minutos.'
    ],
    5: [
      'La línea 5 de buses urbanos de Manta inicia su recorrido en el Coliseo Tohallí y llega hasta Palo Santo, pasando por la ULEAM, el hospital Rodríguez Zambrano y el Registro Civil.',
      'El servicio empieza a las 06:00 y termina a las 20:24, de lunes a domingo.'
    ],
    7: [
      'La primera parada de la línea 7 de autobús es Parroquia Jaramijó y la última parada es Manta. La línea 7 (Ciudadela Nueva Esperanza – Agencia Municipal De Tránsito) está operativa todos los días.',
      'Información adicional: la línea 7 tiene 41 paradas y la duración total del viaje para esta ruta es de aproximadamente 43 minutos.'
    ],
    8: [
      'La primera parada de la línea 8 de autobús es E15 Manta y la última parada es Vía Manta – Montecristi Manta. La línea 8 (Ciudadela Deportiva – Leónidas Proaño) está operativa todos los días.',
      'Información adicional: la línea 8 tiene 48 paradas y la duración total del viaje para esta ruta es de aproximadamente 45 minutos.'
    ],
    9: [
      'La primera parada de la línea 9 de autobús es E15 Manta y la última parada es Manta. La línea 9 (Ciudadela Deportiva – Ciudadela Costa Azul) está operativa todos los días.',
      'Información adicional: la línea 9 tiene 39 paradas y la duración total del viaje para esta ruta es de aproximadamente 41 minutos.'
    ],
    10: [
      'La primera parada de la línea 10 de autobús es E15 Manta y la última parada es Calle 10 de Agosto Manta. La línea 10 (Ciudadela Deportiva – Cielito Lindo) está operativa todos los días.',
      'Información adicional: la línea 10 tiene 45 paradas y la duración total del viaje para esta ruta es de aproximadamente 48 minutos.'
    ],
    11: [
      'La primera parada de la línea 11 de autobús es E15 Manta y la última parada es Manta. La línea 11 (Ciudadela Deportiva – La Revancha) está operativa todos los días.',
      'Información adicional: la línea 11 tiene 48 paradas y la duración total del viaje para esta ruta es de aproximadamente 50 minutos.'
    ],
    12: [
      'La primera parada de la línea 12 de autobús es E15 Manta y la última parada es Manta. La línea 12 (Ciudadela Deportiva – La Cumbres) está operativa todos los días.',
      'Información adicional: la línea 12 tiene 28 paradas y la duración total del viaje para esta ruta es de aproximadamente 30 minutos.'
    ],
    14: [
      'La primera parada de la línea 14 de autobús es E15 Manta y la última parada es Manta. La línea 14 (Ciudadela Deportiva – Cosase) está operativa todos los días.',
      'Información adicional: la línea 14 tiene 37 paradas y la duración total del viaje para esta ruta es de aproximadamente 40 minutos.'
    ],
    15: [
      'La primera parada de la línea 15 de autobús es Manta y la última parada es Manta. La línea 15 (Ciudadela Los Geranios – San Juan) está operativa todos los días.',
      'Información adicional: la línea 15 tiene 34 paradas y la duración total del viaje para esta ruta es de aproximadamente 36 minutos.'
    ],
    16: [
      'La primera parada de la línea 16 de autobús es E15 Manta y la última parada es Vía Interbarrial Manta. La línea 16 (Ciudadela Deportiva – Ciudadela Montalván) está operativa todos los días.',
      'Información adicional: la línea 16 tiene 35 paradas y la duración total del viaje para esta ruta es de aproximadamente 38 minutos.'
    ],
    17: [
      'La primera parada de la línea 17 de autobús es Manta y la última parada es Manta. La línea 17 (Nuevo Terminal Terrestre – Ciudadela Deportiva) está operativa todos los días.',
      'Información adicional: la línea 17 tiene 28 paradas y la duración total del viaje para esta ruta es de aproximadamente 31 minutos.'
    ]
  };

  // FAQs comunes (cambia solo el número de línea dentro del texto)
  const faqItems = [
    {
      q: `¿A qué hora comienza a funcionar la línea ${routeId} del autobús?`,
      a: `El servicio de la ${routeId} del autobús comienza a operar a las 06:00 los lunes, martes, miércoles, jueves, viernes, sábado y domingo.`
    },
    {
      q: `¿A qué hora deja de funcionar la línea ${routeId} del autobús?`,
      a: `El servicio de la ${routeId} del autobús deja de operar a las 22:00 los lunes, martes, miércoles, jueves, viernes, sábado y domingo.`
    }
  ];

  const infoParagraphs = infoTextMap[routeId] || [];

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        ← Volver
      </button>

      <h1 className={styles.title}>{route.name}</h1>
      <p className={styles.desc}>{route.description}</p>

      {/* Información adicional si existe */}
      {infoParagraphs.length > 0 && (
        <div className={styles.info}>
          {infoParagraphs.map((txt, i) => (
            <p key={i}>{txt}</p>
          ))}
        </div>
      )}

      {/* Mapa de la ruta */}
      <div className={styles.mapWrapper}>
        <img
          src={route.image}
          alt={`Mapa de ${route.name}`}
          className={styles.map}
        />
      </div>

      {/* FAQs si info existe */}
      {infoParagraphs.length > 0 && (
        <div className={styles.faqSection}>
          <h2>Preguntas frecuentes de {route.name}</h2>
          {faqItems.map((item, i) => (
            <React.Fragment key={i}>
              <div className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
              {i < faqItems.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
