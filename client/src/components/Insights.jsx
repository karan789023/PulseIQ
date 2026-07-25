import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function Insights({ insights = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl font-bold">Smart Insights</h2>

      <div className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-slate-400">No insights available.</p>
        ) : (
          insights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg bg-slate-900 p-3"
            >
              {item.type === "success" ? (
                <CheckCircle2 className="text-green-400" size={20} />
              ) : (
                <AlertTriangle className="text-yellow-400" size={20} />
              )}

              <span>{item.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}