// src/pages/auth/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import AlertMessage from '../../components/common/AlertMessage';
import styles from './AuthPages.module.css';

const LoginPage = () => {
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
      const response = await loginUser({ email, password });
      
      // *** VERIFICACIÓN CRÍTICA ***
      // 1. Guardar el token de acceso:
      // Tu AuthService devuelve { access_token: "...", user: { ... } }
      // Así que `response.access_token` es correcto.
      localStorage.setItem('accessToken', response.access_token); 
      
      // 2. Guardar el objeto de usuario:
      // Tu AuthService devuelve { ..., user: { id, email, username, role } }
      // Entonces `response.user` es el objeto que necesitamos, y `role` ya está incluido.
      localStorage.setItem('user', JSON.stringify(response.user));

      setMessage('¡Inicio de sesión exitoso!');
      setIsError(false);

      // Ahora que `response.user.role` debería tener un valor ('user' o 'admin'),
      // esta lógica de redirección funcionará correctamente.
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error completo al iniciar sesión:", error); // Para ver el error detallado en la consola
      // Mejor manejo de errores, especialmente para Axios/fetch, donde el mensaje puede estar en `error.response.data.message`
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido al iniciar sesión.';
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
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate</Link></p>
    </div>
  );
};

export default LoginPage;