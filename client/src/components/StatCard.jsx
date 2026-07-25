import { motion } from "framer-motion";

const colors = {
  green: "border-green-500/30 bg-green-500/10",
  blue: "border-blue-500/30 bg-blue-500/10",
  purple: "border-purple-500/30 bg-purple-500/10",
  orange: "border-orange-500/30 bg-orange-500/10",
  cyan: "border-cyan-500/30 bg-cyan-500/10",
  emerald: "border-emerald-500/30 bg-emerald-500/10",
};

export default function StatCard({
  icon,
  title,
  value,
  color = "cyan",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border ${colors[color]} p-5 shadow-lg`}
    >
      <div className="mb-3 text-cyan-400">{icon}</div>

      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </motion.div>
  );
}