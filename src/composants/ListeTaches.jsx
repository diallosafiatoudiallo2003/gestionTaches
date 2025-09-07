import ElementTache from './ElementTache';

const ListeTaches = ({ taches, onBasculer, onSupprimer }) => {
  if (taches.length === 0) {
    return <p className="text-gray-500">Aucune tâche pour le moment</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {taches.map((tache) => (
        <ElementTache
          key={tache.id}
          tache={tache}
          onBasculer={onBasculer}
          onSupprimer={onSupprimer}
        />
      ))}
    </ul>
  );
};

export default ListeTaches;