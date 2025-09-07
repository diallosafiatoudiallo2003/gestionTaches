import { useState } from 'react';
import { useTask } from '../../context/TaskContext';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    status: 'en cours',
    priorite: 'moyenne',
    dateLimite: '',
    membre: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask } = useTask();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est obligatoire';
    }

    if (!formData.dateLimite) {
      newErrors.dateLimite = 'La date limite est obligatoire';
    } else {
      const selectedDate = new Date(formData.dateLimite);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dateLimite = 'La date limite ne peut pas être dans le passé';
      }
    }

    if (!formData.membre.trim()) {
      newErrors.membre = 'Le membre assigné est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const taskData = {
        ...formData,
        dateLimite: new Date(formData.dateLimite)
      };
      
      addTask(taskData);
      
      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        description: '',
        status: 'en cours',
        priorite: 'moyenne',
        dateLimite: '',
        membre: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Nouvelle Tâche</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la tâche *
            </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.titre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Terminer le rapport mensuel"
            />
            {errors.titre && (
              <p className="mt-1 text-sm text-red-600">{errors.titre}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="Décrivez les détails de la tâche..."
            />
          </div>

          {/* Ligne avec Statut et Priorité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Statut */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
            </div>

            {/* Priorité */}
            <div>
              <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-2">
                Priorité
              </label>
              <select
                id="priorite"
                name="priorite"
                value={formData.priorite}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>
          </div>

          {/* Ligne avec Date limite et Membre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date limite */}
            <div>
              <label htmlFor="dateLimite" className="block text-sm font-medium text-gray-700 mb-2">
                Date limite *
              </label>
              <input
                type="date"
                id="dateLimite"
                name="dateLimite"
                value={formData.dateLimite}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.dateLimite ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateLimite && (
                <p className="mt-1 text-sm text-red-600">{errors.dateLimite}</p>
              )}
            </div>

            {/* Membre assigné */}
            <div>
              <label htmlFor="membre" className="block text-sm font-medium text-gray-700 mb-2">
                Membre assigné *
              </label>
              <input
                type="text"
                id="membre"
                name="membre"
                value={formData.membre}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.membre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Alice Martin"
              />
              {errors.membre && (
                <p className="mt-1 text-sm text-red-600">{errors.membre}</p>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Création...' : 'Créer la tâche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
