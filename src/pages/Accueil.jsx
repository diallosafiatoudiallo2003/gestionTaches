import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskStats from '../components/tasks/TaskStats';

const Accueil = () => {
  const { user } = useAuth();
  const { tasks, filter, setFilter, sortBy, setSortBy } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les tâches par terme de recherche
  const filteredTasks = tasks.filter(task =>
    task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.membre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterOptions = [
    { value: 'all', label: 'Toutes les tâches', icon: '📋' },
    { value: 'en cours', label: 'En cours', icon: '⏳' },
    { value: 'terminée', label: 'Terminées', icon: '✅' }
  ];

  const sortOptions = [
    { value: 'dateLimite', label: 'Date limite' },
    { value: 'priorite', label: 'Priorité' },
    { value: 'titre', label: 'Titre' },
    { value: 'createdAt', label: 'Date de création' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Bonjour, {user?.name || user?.email} ! 👋
                </h1>
                <p className="text-gray-600">
                  Gérez vos tâches efficacement et restez organisé.
                </p>
              </div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ➕ Nouvelle tâche
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <TaskStats />

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Barre de recherche */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filtre par statut */}
              <div className="min-w-[200px]">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tri */}
              <div className="min-w-[180px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      Trier par {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des tâches */}
        <div className="space-y-6">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'Aucune tâche trouvée' : 'Aucune tâche pour le moment'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Essayez de modifier votre recherche ou vos filtres.'
                  : 'Commencez par créer votre première tâche pour rester organisé.'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ➕ Créer ma première tâche
                </button>
              )}
            </div>
          ) : (
            <>
              {/* En-tête de la liste */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? `Résultats de recherche (${filteredTasks.length})` : 
                   filter === 'all' ? `Toutes les tâches (${filteredTasks.length})` :
                   `Tâches ${filter} (${filteredTasks.length})`}
                </h2>
              </div>

              {/* Grille des tâches */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Formulaire de création de tâche */}
        {showTaskForm && (
          <TaskForm onClose={() => setShowTaskForm(false)} />
        )}
      </div>
    </div>
  );
};

export default Accueil;