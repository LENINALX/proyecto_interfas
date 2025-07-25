import React, { useState, useEffect } from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../../components/common/Button';
import AlertMessage from '../../components/common/AlertMessage';
import styles from './AuthPages.module.css';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estado para el mensaje de error de validación
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage]             = useState('');
  const [isError, setIsError]             = useState(false);

  const navigate = useNavigate();

  // Cada vez que cambie `password`, revisamos el patrón
  useEffect(() => {
    if (!password) {
      setPasswordError('');
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        'La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número.'
      );
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si hay error de validación, no enviamos
    if (passwordError) return;

    setMessage('');
    setIsError(false);
    try {
      await registerUser({ username, email, password });
      setMessage(`¡Registro exitoso! Bienvenido, ${username}.`);
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error al registrarse:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Error desconocido.';
      setMessage(`Error en el registro: ${errorMessage}`);
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
        {/* Nombre de usuario */}
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputField}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            required
          />
        </div>

        {/* Correo electrónico */}
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputField}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>

        {/* Contraseña con mostrar/ocultar */}
        <div className={styles.passwordField}>
          <input
            className={styles.inputField}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((s) => !s)}
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Aviso de validación */}
        {passwordError && (
          <p className={styles.validationError}>{passwordError}</p>
        )}

        {/* Desactivamos el botón si la contraseña no es válida */}
        <Button type="submit" disabled={!!passwordError}>
          Registrarse
        </Button>
      </form>

      <p>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className={styles.link}>
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
