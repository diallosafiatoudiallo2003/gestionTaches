import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

const ElementTache = ({ tache, onBasculer, onSupprimer }) => {
  return (
    <li className={`flex items-center p-4 bg-white rounded-lg shadow mb-2 ${
      tache.terminee ? 'opacity-60' : ''
    }`}>
      <button
        onClick={() => onBasculer(tache.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
          tache.terminee 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300'
        }`}
      >
        {tache.terminee && <CheckIcon className="w-4 h-4" />}
      </button>
      <span
        className={`flex-1 ${
          tache.terminee ? 'line-through text-gray-400' : ''
        }`}
      >
        {tache.texte}
      </span>
      <button
        onClick={() => onSupprimer(tache.id)}
        className="text-red-500 hover:text-red-700"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default ElementTache;