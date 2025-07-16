// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// Componentes de Layout
import Header from './components/layout/Header';
// Páginas de Autenticación
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
// Páginas de Usuario
import HomePage from './pages/user/HomePage';
import RoutesPage from './pages/user/RoutesPage';
import CyclingPage from './pages/user/CyclingPage';
import ParksPage from './pages/user/ParksPage';
// Páginas de Administrador
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Componente auxiliar para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');

  // **DEBUGGING CONSOLE.LOGS - MANTENLOS POR AHORA**
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - accessToken:", accessToken);
  if (user && allowedRoles) {
      console.log("ProtectedRoute - user.role:", user.role);
      console.log("ProtectedRoute - allowedRoles:", allowedRoles);
      console.log("ProtectedRoute - includes role:", allowedRoles.includes(user.role));
  }


  if (!accessToken || !user) {
    console.log("ProtectedRoute: Redirigiendo a /login - No accessToken o user.");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`ProtectedRoute: Redirigiendo a /home - Rol ${user.role} no permitido para esta ruta.`);
    return <Navigate to="/home" replace />;
  }

  console.log("ProtectedRoute: Acceso PERMITIDO.");
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            {/* Rutas de autenticación (públicas) */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Ruta raíz redirige a /home por defecto */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Rutas de usuario general (accesibles para user y admin) */}
            <Route path="/home" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/routes" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <RoutesPage />
              </ProtectedRoute>
            } />
            {/* Rutas para sub-páginas de Rutas */}
            <Route path="/routes/linea1" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RoutesPage /></ProtectedRoute>} />
            <Route path="/routes/linea2" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RoutesPage /></ProtectedRoute>} />
            <Route path="/routes/linea3" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RoutesPage /></ProtectedRoute>} />
            <Route path="/routes/linea4" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RoutesPage /></ProtectedRoute>} />
            <Route path="/routes/linea5" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RoutesPage /></ProtectedRoute>} />

            <Route path="/cycling" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <CyclingPage />
              </ProtectedRoute>
            } />
            {/* Rutas para sub-páginas de Ciclismo */}
            <Route path="/cycling/cicloruta-rio" element={<ProtectedRoute allowedRoles={['user', 'admin']}><CyclingPage /></ProtectedRoute>} />
            <Route path="/cycling/cicloruta-urbana" element={<ProtectedRoute allowedRoles={['user', 'admin']}><CyclingPage /></ProtectedRoute>} />
            <Route path="/cycling/cicloruta-montanosa" element={<ProtectedRoute allowedRoles={['user', 'admin']}><CyclingPage /></ProtectedRoute>} />

            <Route path="/parks" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <ParksPage />
              </ProtectedRoute>
            } />
            {/* Rutas para sub-páginas de Parques */}
            <Route path="/parks/parque-central" element={<ProtectedRoute allowedRoles={['user', 'admin']}><ParksPage /></ProtectedRoute>} />
            <Route path="/parks/parque-lago" element={<ProtectedRoute allowedRoles={['user', 'admin']}><ParksPage /></ProtectedRoute>} />
            <Route path="/parks/parque-infantil" element={<ProtectedRoute allowedRoles={['user', 'admin']}><ParksPage /></ProtectedRoute>} />
            <Route path="/parks/parque-ecologico" element={<ProtectedRoute allowedRoles={['user', 'admin']}><ParksPage /></ProtectedRoute>} />
            <Route path="/parks/parque-deportivo" element={<ProtectedRoute allowedRoles={['user', 'admin']}><ParksPage /></ProtectedRoute>} />


            {/* Rutas de administrador (solo accesibles para admin) */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />

            {/* Ruta 404 para cualquier otra URL */}
            <Route path="*" element={
                <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
                    <h1>404 - Página no encontrada</h1>
                    <p>Lo sentimos, la página que buscas no existe.</p>
                    <Link to="/home">Volver al inicio</Link>
                </div>
            } />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;