import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, en cours, terminée
  const [sortBy, setSortBy] = useState('dateLimite'); // titre, priorite, dateLimite, createdAt
  const { user } = useAuth();

  // Données de démonstration
  const mockTasks = [
    {
      id: '1',
      titre: 'Terminer le rapport',
      description: 'Finaliser le rapport de projet pour le client.',
      status: 'en cours',
      priorite: 'haute',
      dateLimite: new Date('2024-12-15'),
      user: user?.id,
      membre: 'Alice Martin',
      createdAt: new Date('2024-11-01'),
      updatedAt: new Date('2024-11-01')
    },
    {
      id: '2',
      titre: 'Révision du code',
      description: 'Réviser le code de l\'application mobile.',
      status: 'terminée',
      priorite: 'moyenne',
      dateLimite: new Date('2024-11-30'),
      user: user?.id,
      membre: 'Jean Dupont',
      createdAt: new Date('2024-10-15'),
      updatedAt: new Date('2024-11-20')
    },
    {
      id: '3',
      titre: 'Réunion équipe',
      description: 'Organiser la réunion hebdomadaire de l\'équipe.',
      status: 'en cours',
      priorite: 'basse',
      dateLimite: new Date('2024-12-10'),
      user: user?.id,
      membre: 'Marie Dubois',
      createdAt: new Date('2024-11-05'),
      updatedAt: new Date('2024-11-05')
    }
  ];

  useEffect(() => {
    // Charger les tâches depuis localStorage ou utiliser les données de démonstration
    const storedTasks = localStorage.getItem(`tasks_${user?.id}`);
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks).map(task => ({
        ...task,
        dateLimite: new Date(task.dateLimite),
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }));
      setTasks(parsedTasks);
    } else {
      setTasks(mockTasks);
      localStorage.setItem(`tasks_${user?.id}`, JSON.stringify(mockTasks));
    }
  }, [user?.id]);

  // Sauvegarder les tâches dans localStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user?.id}`, JSON.stringify(newTasks));
  };

  // Ajouter une nouvelle tâche
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      user: user?.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    return newTask;
  };

  // Mettre à jour une tâche
  const updateTask = (taskId, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    );
    saveTasks(updatedTasks);
  };

  // Supprimer une tâche
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  // Changer le statut d'une tâche
  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'en cours' ? 'terminée' : 'en cours';
      updateTask(taskId, { status: newStatus });
    }
  };

  // Filtrer et trier les tâches
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;

    // Appliquer le filtre
    if (filter !== 'all') {
      filteredTasks = tasks.filter(task => task.status === filter);
    }

    // Appliquer le tri
    filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'titre':
          return a.titre.localeCompare(b.titre);
        case 'priorite':
          const prioriteOrder = { 'haute': 3, 'moyenne': 2, 'basse': 1 };
          return prioriteOrder[b.priorite] - prioriteOrder[a.priorite];
        case 'dateLimite':
          return new Date(a.dateLimite) - new Date(b.dateLimite);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filteredTasks;
  };

  // Statistiques des tâches
  const getTaskStats = () => {
    const total = tasks.length;
    const enCours = tasks.filter(task => task.status === 'en cours').length;
    const terminees = tasks.filter(task => task.status === 'terminée').length;
    const haute = tasks.filter(task => task.priorite === 'haute').length;
    const enRetard = tasks.filter(task => 
      task.status === 'en cours' && new Date(task.dateLimite) < new Date()
    ).length;

    return { total, enCours, terminees, haute, enRetard };
  };

  const value = {
    tasks: getFilteredAndSortedTasks(),
    allTasks: tasks,
    loading,
    filter,
    sortBy,
    setFilter,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask doit être utilisé à l\'intérieur d\'un TaskProvider');
  }
  return context;
};
