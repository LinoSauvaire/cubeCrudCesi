import {motion} from "framer-motion";

// @ts-ignore
export const StatCard = ({ title, value, icon, color }) => {
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