const APropos = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">À propos</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">
            Bienvenue dans le Gestionnaire de Tâches, une application simple et efficace pour gérer vos tâches quotidiennes.
          </p>
          <p className="mb-4">
            Cette application a été développée avec React, Vite et Tailwind CSS.
          </p>
          <p>Fonctionnalités :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Ajouter de nouvelles tâches</li>
            <li>Marquer les tâches comme terminées</li>
            <li>Supprimer des tâches</li>
            <li>Persistance des données dans le localStorage</li>
            <li>Interface réactive et moderne</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default APropos;