import { useState } from 'react';
import { useTask } from '../../context/TaskContext';

const TaskCard = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { updateTask, deleteTask, toggleTaskStatus } = useTask();

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basse': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    return status === 'terminée' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const isOverdue = () => {
    return task.status === 'en cours' && new Date(task.dateLimite) < new Date();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
      task.status === 'terminée' ? 'border-green-500' : 
      isOverdue() ? 'border-red-500' : 'border-blue-500'
    } ${task.status === 'terminée' ? 'opacity-75' : ''}`}>
      
      {/* En-tête de la carte */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${
              task.status === 'terminée' ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.titre}
            </h3>
            
            {/* Badges de statut et priorité */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priorite)}`}>
                Priorité {task.priorite}
              </span>
              {isOverdue() && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  En retard
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className={`p-2 rounded-lg transition-colors ${
                task.status === 'terminée'
                  ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                  : 'bg-green-100 hover:bg-green-200 text-green-700'
              }`}
              title={task.status === 'terminée' ? 'Marquer en cours' : 'Marquer terminée'}
            >
              {task.status === 'terminée' ? '↶' : '✓'}
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
              title="Supprimer"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Description courte */}
        {task.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📅</span>
            <span className={`${isOverdue() ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
              {formatDate(task.dateLimite)}
            </span>
          </div>
          
          {task.membre && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">👤</span>
              <span className="text-gray-700">{task.membre}</span>
            </div>
          )}
        </div>

        {/* Bouton pour afficher/masquer les détails */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>
      </div>

      {/* Détails étendus */}
      {showDetails && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            {task.description && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description complète</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Créée le :</span>
                <span className="ml-2 text-gray-600">{formatDate(task.createdAt)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Modifiée le :</span>
                <span className="ml-2 text-gray-600">{formatDate(task.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
