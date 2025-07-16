// src/pages/auth/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import AlertMessage from '../../components/common/AlertMessage';
import styles from './AuthPages.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    try {
      await registerUser({ username, email, password });
      setMessage(`¡Registro exitoso! Bienvenido, ${username}.`);
      setIsError(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(`Error al registrar: ${error.message}`); //
      setIsError(true);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Crear una cuenta</h2>
      {message && (
        <AlertMessage message={message} type={isError ? 'error' : 'success'} />
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario" // Placeholder como en tus imágenes
          required
        />
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico" // Placeholder como en tus imágenes
          required
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña" // Placeholder como en tus imágenes
          required
        />
        <Button type="submit">Registrarse</Button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login" className={styles.link}>Inicia Sesión</Link></p>
    </div>
  );
};

export default RegisterPage;