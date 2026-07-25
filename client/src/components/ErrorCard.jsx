import { AlertTriangle } from "lucide-react";

export default function ErrorCard({ error }) {
  if (!error) return null;

  return (
    <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <AlertTriangle className="mt-1 h-7 w-7 text-red-400" />

        <div>
          <h2 className="text-xl font-bold text-red-300">
            Analysis Failed
          </h2>

          <p className="mt-2 text-red-100">
            {error.message}
          </p>

          <div className="mt-4 inline-flex rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-200">
            Error Code: {error.code}
          </div>
        </div>
      </div>
    </div>
  );
}