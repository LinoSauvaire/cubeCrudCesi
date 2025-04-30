import {motion} from "framer-motion";

export const ActivityChart = () => {
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