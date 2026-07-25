import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { analyzeWebsite } from "../services/api";

export default function SearchBar({ setReport, setError }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
const handleAnalyze = async () => {
  if (!url.trim()) {
    toast.error("Enter a website URL");
    return;
  }

  try {
    setLoading(true);

    // Clear previous error
    setError(null);

    const result = await analyzeWebsite(url);

    if (result.success) {
      setReport(result.data);
      toast.success("Analysis completed");
    } else {
      setReport(null);

      setError({
        code: result.error?.code || "UNKNOWN_ERROR",
        message: result.error?.message || "Analysis failed.",
      });

      toast.error(result.error?.message || "Analysis failed");
    }
  } catch (err) {
    setReport(null);

    const errorObj = {
      code: err.response?.data?.error?.code || "UNKNOWN_ERROR",
      message:
        err.response?.data?.error?.message ||
        err.message ||
        "Something went wrong.",
    };

    setError(errorObj);

    toast.error(errorObj.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex gap-3">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="flex-1 rounded-xl border bg-slate-900 p-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="rounded-xl bg-cyan-500 px-8 text-white"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Search />
        )}
      </button>
    </div>
  );
}