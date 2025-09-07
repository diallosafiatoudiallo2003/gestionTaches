import { useTask } from '../../context/TaskContext';

const TaskStats = () => {
  const { getTaskStats } = useTask();
  const stats = getTaskStats();

  const statCards = [
    {
      title: 'Total',
      value: stats.total,
      icon: '📋',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'En cours',
      value: stats.enCours,
      icon: '⏳',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Terminées',
      value: stats.terminees,
      icon: '✅',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Priorité haute',
      value: stats.haute,
      icon: '🔥',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'En retard',
      value: stats.enRetard,
      icon: '⚠️',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-4 border border-opacity-20 hover:shadow-md transition-all duration-200`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
          </div>
          <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
