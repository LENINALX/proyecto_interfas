// src/components/common/InputField.js
import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type, value, onChange, placeholder, required = false, className = '' }) => {
  return (
    <div className={styles.inputGroup}>
      {/* El label está oculto por defecto para coincidir con tus imágenes que solo usan placeholder */}
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default InputField;