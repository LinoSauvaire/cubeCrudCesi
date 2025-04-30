import {motion} from "framer-motion";

export const Sidebar = () => {
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