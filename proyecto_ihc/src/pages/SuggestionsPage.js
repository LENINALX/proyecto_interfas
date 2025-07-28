import React, { useEffect, useState } from "react";
import styles from "./SuggestionsPage.module.css";

function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);

  // Cargar sugerencias del localStorage al montar la página
  useEffect(() => {
    const local = localStorage.getItem("suggestedRoutes");
    if (local) setSuggestions(JSON.parse(local));
  }, []);

  return (
    <div className={styles.container}>
      <h1>📝 Sugerencias de Rutas</h1>
      <p>Estas son las rutas sugeridas por los usuarios desde el formulario.</p>

      {suggestions.length === 0 ? (
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
                  ? s.categories.join(", ")
                  : "Ninguna"}
              </div>
              {s.fileName && (
                <div className={styles.attachment}>
                  <b>Archivo:</b> {s.fileName}
                </div>
              )}
              {/* Próximamente: botón para editar y guardar cambios */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestionsPage;
