import React, { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import AlertMessage from '../../components/common/AlertMessage';
import styles from './AuthPages.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setMessage('¡Inicio de sesión exitoso!');
      setIsError(false);

      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error completo al iniciar sesión:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error desconocido al iniciar sesión.';
      setMessage(`Error al iniciar sesión: ${errorMessage}`);
      setIsError(true);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Iniciar Sesión</h2>
      {message && (
        <AlertMessage message={message} type={isError ? 'error' : 'success'} />
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />

        {/* Campo de contraseña con botón mostrar/ocultar */}
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

        <Button type="submit">Iniciar Sesión</Button>
      </form>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className={styles.link}>
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
