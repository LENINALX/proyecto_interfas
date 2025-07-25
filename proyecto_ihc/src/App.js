// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';

// Componentes de Layout
import Header from './components/layout/Header';

// Páginas de Autenticación
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

// Páginas de Usuario
import HomePage from './pages/user/HomePage';
import RoutesPage from './pages/user/RoutesPage';
import RouteDetailPage from './pages/user/RouteDetailPage';
import CyclingPage from './pages/user/CyclingPage';
import ParksPage from './pages/user/ParksPage';

// Páginas de Administrador
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Componente auxiliar para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');

  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - accessToken:", accessToken);

  if (!accessToken || !user) {
    console.log("ProtectedRoute: redirigiendo a /login (no token o user)");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(
      `ProtectedRoute: redirigiendo a /home (rol ${user.role} no permitido)`
    );
    return <Navigate to="/home" replace />;
  }

  console.log("ProtectedRoute: acceso PERMITIDO");
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            {/* Públicas */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Redirige raíz a /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Páginas de usuario */}
            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Listado de rutas */}
            <Route
              path="/routes"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <RoutesPage />
                </ProtectedRoute>
              }
            />

            {/* Detalle de una ruta específica */}
            <Route
              path="/routes/:id"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <RouteDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Ciclismo */}
            <Route
              path="/cycling"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <CyclingPage />
                </ProtectedRoute>
              }
            />

            {/* Sub-páginas de Ciclismo */}
            <Route
              path="/cycling/cicloruta-rio"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <CyclingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cycling/cicloruta-urbana"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <CyclingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cycling/cicloruta-montanosa"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <CyclingPage />
                </ProtectedRoute>
              }
            />

            {/* Parques */}
            <Route
              path="/parks"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />

            {/* Sub-páginas de Parques */}
            <Route
              path="/parks/parque-central"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parks/parque-lago"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parks/parque-infantil"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parks/parque-ecologico"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parks/parque-deportivo"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <ParksPage />
                </ProtectedRoute>
              }
            />

            {/* Dashboard admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div
                  className="container"
                  style={{ textAlign: 'center', marginTop: '100px' }}
                >
                  <h1>404 - Página no encontrada</h1>
                  <p>Lo sentimos, la página que buscas no existe.</p>
                  <Link to="/home">Volver al inicio</Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
