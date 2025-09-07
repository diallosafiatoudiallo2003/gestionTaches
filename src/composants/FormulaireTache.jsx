import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const FormulaireTache = ({ onAjouter }) => {
  const [texte, setTexte] = useState('');

  const gererSoumission = (e) => {
    e.preventDefault();
    if (texte.trim()) {
      onAjouter(texte);
      setTexte('');
    }
  };

  return (
    <form onSubmit={gererSoumission} className="flex gap-2 mb-6">
      <input
        type="text"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
      >
        <PlusIcon className="w-5 h-5" />
        Ajouter
      </button>
    </form>
  );
};

export default FormulaireTache;