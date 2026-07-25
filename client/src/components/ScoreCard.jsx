import { motion } from "framer-motion";

export default function ScoreCard({ score }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-8 text-center"
    >
      <p className="text-slate-400">SEO Health Score</p>

      <h1 className="mt-4 text-6xl font-black text-cyan-400">
        {score ?? 0}
      </h1>

      <p className="mt-2 text-slate-300">/100</p>
    </motion.div>
  );
}