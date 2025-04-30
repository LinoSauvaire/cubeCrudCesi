'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from './_component/NavBar';
import { motion } from 'framer-motion';

// @ts-ignore
const StatCard = ({ title, value, icon, color }) => {
    return (
        <motion.div
            className={`p-6 rounded-lg shadow-md ${color}`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-opacity-20 ${color.replace('bg-', 'bg-opacity-20 text-')}`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );
};

const ActivityChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activité Récente</h3>
            <div className="flex items-end h-40 space-x-2">
                {[40, 25, 60, 30, 45, 80, 55].map((height, index) => (
                    <motion.div
                        key={index}
                        className="bg-indigo-500 rounded-t w-8"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                ))}
            </div>
        </div>
    );
};

const RecentTasks = () => {
    const tasks = [
        { id: 1, title: "Mise à jour du catalogue", status: "Terminé", date: "Aujourd'hui" },
        { id: 2, title: "Répondre aux messages", status: "En cours", date: "Aujourd'hui" },
        { id: 3, title: "Gérer les commandes", status: "En attente", date: "Demain" },
        { id: 4, title: "Mettre à jour le stock", status: "En attente", date: "Demain" },
    ];

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

const Sidebar = () => {
    const menuItems = [
        { icon: "📊", label: "Vue d'ensemble", active: true },
        { icon: "🛒", label: "Produits" },
        { icon: "💰", label: "Commandes" },
        { icon: "👥", label: "Clients" },
        { icon: "📈", label: "Rapports" },
        { icon: "⚙️", label: "Paramètres" },
    ];

    return (
        <div className="bg-indigo-800 text-white w-64 p-4 hidden md:block">
            <div className="mb-6 mt-4">
                <h2 className="text-xl font-bold">Tableau de Bord</h2>
            </div>
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href="#"
                        className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                            item.active ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                        }`}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                    </motion.a>
                ))}
            </nav>
        </div>
    );
};

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login/');
        }

        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Bonjour');
        else if (hour < 18) setGreeting('Bon après-midi');
        else setGreeting('Bonsoir');
    }, [status, router]);

    if (status === 'loading') {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="flex flex-col md:flex-row">
                <Sidebar />
                <div className="flex-1 p-6 md:p-8 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{greeting}, {session?.user?.name || 'utilisateur'}</h1>
                            <p className="text-gray-600 mt-1">Voici un résumé de votre activité récente</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                                Télécharger le rapport
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Produits actifs"
                            value="42"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>}
                            color="bg-indigo-100 text-indigo-800"
                        />
                        <StatCard
                            title="Commandes du mois"
                            value="16"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
                            color="bg-green-100 text-green-800"
                        />
                        <StatCard
                            title="Chiffre d'affaires"
                            value="2 450 €"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                            color="bg-blue-100 text-blue-800"
                        />
                        <StatCard
                            title="Nouveaux clients"
                            value="7"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
                            color="bg-purple-100 text-purple-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ActivityChart />
                        <RecentTasks />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activités récentes</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: item * 0.1 }}
                                    className="flex items-start space-x-3 border-b border-gray-200 pb-4"
                                >
                                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-800">Nouvelle commande reçue <span className="font-medium">#ORD-{item}234</span></p>
                                        <p className="text-sm text-gray-500">Il y a {item} heure{item > 1 ? 's' : ''}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}