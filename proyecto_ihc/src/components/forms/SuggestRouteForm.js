import React, { useState, useEffect } from 'react';
import styles from './SuggestRouteForm.module.css';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

export default function SuggestRouteForm({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Bus');
  const [shortDesc, setShortDesc] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [zone, setZone] = useState('');
  const [visibility, setVisibility] = useState('Pública');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  // Reset cuando se cierra
  useEffect(() => {
    if (!isOpen) {
      setTitle(''); setType('Bus'); setShortDesc('');
      setDistance(''); setDuration(''); setDifficulty('Fácil');
      setCategories([]); setFile(null); setZone(''); setVisibility('Pública');
      setErrors({});
      setToast('');
    }
  }, [isOpen]);

  // Detectar cambios (para confirmación al cerrar)
  const hasChanges = !!(
    title ||
    type !== 'Bus' ||
    shortDesc ||
    distance ||
    duration ||
    difficulty !== 'Fácil' ||
    categories.length > 0 ||
    file ||
    zone ||
    visibility !== 'Pública'
  );

  // Validación
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Título obligatorio';
    if (!shortDesc.trim()) e.shortDesc = 'Descripción corta obligatoria';
    if (!distance.trim() || isNaN(Number(distance))) e.distance = 'Distancia válida obligatoria';
    if (!duration.trim()) e.duration = 'Duración obligatoria';
    if (!zone.trim()) e.zone = 'Zona obligatoria';
    return e;
  };

  // Confirmación al cerrar con cambios
  const handleTryClose = () => {
    if (hasChanges) {
      if (window.confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Envío
  const handleSubmit = e => {
    e.preventDefault();
    const eValid = validate();
    if (Object.keys(eValid).length) {
      setErrors(eValid);
      return;
    }
    setToast('¡Ruta sugerida con éxito!');
    setTimeout(() => {
      setToast('');
      onClose();
    }, 1400);
  };

  if (!isOpen) return null;
  return (
    <>
      {toast && <div className={styles.toast}>{toast}</div>}
      <div className={styles.backdrop}>
        <div className={styles.drawer}>
          <div className={styles.header}>
            <h2><FaMapMarkerAlt /> Sugerir nueva ruta</h2>
            <button onClick={handleTryClose} className={styles.close}><FaTimes /></button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>

            <label>
              1. Título de la ruta <span className={styles.required}>*</span>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={errors.title ? styles.invalid : (title ? styles.valid : '')}
                aria-label="Título de la ruta"
                required
              />
              {errors.title && <small className={styles.error}>{errors.title}</small>}
            </label>

            <label>
              2. Tipo <span className={styles.required}>*</span>
              <select value={type} onChange={e => setType(e.target.value)} aria-label="Tipo de ruta">
                <option value="Bus">🚍 Bus</option>
                <option value="Ciclismo">🚴 Ciclismo</option>
              </select>
            </label>

            <label>
              3. Descripción corta <span className={styles.required}>*</span>
              <input
                type="text"
                value={shortDesc}
                onChange={e => setShortDesc(e.target.value)}
                className={errors.shortDesc ? styles.invalid : (shortDesc ? styles.valid : '')}
                aria-label="Descripción corta"
                required
              />
              {errors.shortDesc && <small className={styles.error}>{errors.shortDesc}</small>}
            </label>

            <label>
              4. Distancia estimada (km) <span className={styles.required}>*</span>
              <span title="Ingresa solo números, en kilómetros" className={styles.info}>ⓘ</span>
              <input
                type="text"
                value={distance}
                onChange={e => setDistance(e.target.value)}
                className={errors.distance ? styles.invalid : (distance && !isNaN(Number(distance)) ? styles.valid : '')}
                aria-label="Distancia estimada en kilómetros"
                required
              />
              {errors.distance && <small className={styles.error}>{errors.distance}</small>}
            </label>

            <label>
              5. Duración aproximada (hh:mm) <span className={styles.required}>*</span>
              <span title="Ejemplo: 01:30 para una hora y media" className={styles.info}>ⓘ</span>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className={errors.duration ? styles.invalid : (duration ? styles.valid : '')}
                aria-label="Duración aproximada (hh:mm)"
                required
              />
              {errors.duration && <small className={styles.error}>{errors.duration}</small>}
            </label>

            <label>
              6. Dificultad
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option>Fácil</option>
                <option>Intermedia</option>
                <option>Difícil</option>
              </select>
            </label>

            <fieldset className={styles.checkboxGroup}>
              <legend>7. Categorías opcionales</legend>
              {['Panorámico','Urbano','Montaña'].map(cat => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => {
                      setCategories(c =>
                        c.includes(cat) ? c.filter(x => x!==cat) : [...c,cat]
                      );
                    }}
                  /> {cat}
                </label>
              ))}
            </fieldset>

            <label>
              8. Subir GPX / imagen de mapa
              <input
                type="file"
                accept=".gpx,image/*"
                onChange={e => setFile(e.target.files[0])}
                aria-label="Archivo de ruta o imagen"
              />
            </label>

            <label>
              9. Ciudad / Zona <span className={styles.required}>*</span>
              <input
                type="text"
                value={zone}
                onChange={e => setZone(e.target.value)}
                className={errors.zone ? styles.invalid : (zone ? styles.valid : '')}
                aria-label="Ciudad o zona"
                required
              />
              {errors.zone && <small className={styles.error}>{errors.zone}</small>}
            </label>

            <fieldset>
              <legend>10. Visibilidad</legend>
              <label>
                <input
                  type="radio"
                  value="Pública"
                  checked={visibility==='Pública'}
                  onChange={e=>setVisibility(e.target.value)}
                /> Pública
              </label>
              <label>
                <input
                  type="radio"
                  value="Privada"
                  checked={visibility==='Privada'}
                  onChange={e=>setVisibility(e.target.value)}
                /> Privada
              </label>
            </fieldset>

            <div className={styles.footer}>
              <button type="button" className={styles.cancel} onClick={handleTryClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.submit}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
