// src/pages/SuggestionsPage.js
import React, { useEffect, useState } from "react";
import styles from "./SuggestionsPage.module.css";
import { API_BASE_URL } from '../config';

function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar sugerencias del BACKEND al montar la página
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/suggestions`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch(() => {
        setSuggestions([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>📝 Sugerencias de Rutas</h1>
      <p>Estas son las rutas sugeridas por los usuarios desde el formulario.</p>
      {loading ? (
        <div className={styles.empty}>Cargando...</div>
      ) : suggestions.length === 0 ? (
        <div className={styles.empty}>No hay sugerencias guardadas todavía.</div>
      ) : (
        <div className={styles.cards}>
          {suggestions.map((s, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.header}>
                <span className={styles.type}>
                  {s.type === "Bus" ? "🚍" : "🚴"} {s.type}
                </span>
                <span className={styles.visibility}>
                  {s.visibility === "Pública" ? "🌍" : "🔒"}
                </span>
              </div>
              <h3>{s.title}</h3>
              <div className={styles.info}>
                <b>Zona:</b> {s.zone}
                <br />
                <b>Descripción:</b> {s.shortDesc}
                <br />
                <b>Distancia:</b> {s.distance} km
                <br />
                <b>Duración:</b> {s.duration}
                <br />
                <b>Dificultad:</b> {s.difficulty}
                <br />
                <b>Categorías:</b>{" "}
                {s.categories && s.categories.length
                  ? Array.isArray(s.categories)
                    ? s.categories.join(", ")
                    : s.categories // Si viene como string
                  : "Ninguna"}
              </div>
              {/*Imagen aquí */}
              {s.fileUrl && (
                <div className={styles.attachment}>
                  <b>Imagen de ruta:</b>
                  <br />
                  <img
                    src={`${API_BASE_URL}${s.fileUrl}`}
                    alt="Imagen de la ruta"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 180,
                      marginTop: 8,
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestionsPage;
