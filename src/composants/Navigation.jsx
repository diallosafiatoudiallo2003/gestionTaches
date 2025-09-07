import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold mb-2 md:mb-0">Gestionnaire de Tâches</Link>
        
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/" className="hover:underline">Accueil</Link>
              <Link to="/a-propos" className="hover:underline">À propos</Link>
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline">
                  Connecté en tant que <span className="font-medium">{user?.name || user?.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;