import { Link } from 'react-router-dom';

const PageNonTrouvee = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-6">Page non trouvée</h2>
      <p className="mb-6">Désolé, la page que vous recherchez n'existe pas.</p>
      <Link
        to="/"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default PageNonTrouvee;