// src/pages/admin/AdminDashboardPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboardPage.module.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
      } else {
        navigate('/home');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div className={styles.loading}>Cargando panel de administración...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user.username}! Aquí es donde puedes gestionar la aplicación.</p>
      <div className={styles.adminActions}>
        <button className={styles.actionButton}>Gestionar Rutas</button>
        <button className={styles.actionButton}>Gestionar Parques</button>
        <button className={styles.actionButton}>Gestionar Usuarios</button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;