import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export const RecentTasks = () => {

    const [produit, setProduit] = useState([]);


    const fetchProduit = async () => {
        try {
            const response =  await fetch('http://localhost:3000/api/produits');
            const data =  await response.json();
            setProduit(data);
        } catch (error) {
            console.error(error)
        }
    }
    const tasks = [
        { id: 1, title: "Mise à jour du catalogue", status: "Terminé", date: "Aujourd'hui" },
        { id: 2, title: "Répondre aux messages", status: "En cours", date: "Aujourd'hui" },
        { id: 3, title: "Gérer les commandes", status: "En attente", date: "Demain" },
        { id: 4, title: "Mettre à jour le stock", status: "En attente", date: "Demain" },
    ];

    useEffect(() => {
        fetchProduit();
    }, [produit])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tâches Récentes</h3>
            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tâche</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <motion.tr
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <td className="px-4 py-3 text-sm text-gray-900">{task.title}</td>
                            <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                          task.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{task.date}</td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};