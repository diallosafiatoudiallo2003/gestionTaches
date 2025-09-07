import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Navigation from './composants/Navigation';
import Accueil from './pages/Accueil';
import APropos from './pages/APropos';
import PageNonTrouvee from './pages/PageNonTrouvee';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './style/index.css';

// Composant pour la mise en page protégée
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <Navigation />
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  </div>
);

// Composant pour la page d'accueil protégée
const ProtectedHome = () => (
  <ProtectedRoute>
    <TaskProvider>
      <Layout>
        <Accueil />
      </Layout>
    </TaskProvider>
  </ProtectedRoute>
);

// Composant pour la page À propos protégée
const ProtectedAbout = () => (
  <ProtectedRoute>
    <TaskProvider>
      <Layout>
        <APropos />
      </Layout>
    </TaskProvider>
  </ProtectedRoute>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes protégées */}
          <Route path="/" element={<ProtectedHome />} />
          <Route path="/a-propos" element={<ProtectedAbout />} />
          
          {/* Route 404 */}
          <Route path="*" element={<PageNonTrouvee />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;