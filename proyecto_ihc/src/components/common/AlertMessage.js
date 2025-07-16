// src/components/common/AlertMessage.js
import React from 'react';
import styles from './AlertMessage.module.css';

const AlertMessage = ({ message, type }) => {
  if (!message) return null;

  const alertClass = type === 'error' ? styles.errorMessage : styles.successMessage;

  return (
    <div className={alertClass}>
      {message}
    </div>
  );
};

export default AlertMessage;