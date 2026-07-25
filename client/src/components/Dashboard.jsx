import ScoreCard from "./ScoreCard";
import StatCard from "./StatCard";
import Insights from "./Insights";

import {
  Activity,
  Clock,
  FileText,
  Image,
  Type,
  CheckCircle,
} from "lucide-react";



export default function Dashboard({ report }) {
  return (
    <div className="mt-10 space-y-8">

      {/* Top Section */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-1">
          <ScoreCard score={report.seoScore} />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">

          <StatCard
            icon={<CheckCircle />}
            title="HTTP Status"
            value={report.status}
            color="green"
          />

          <StatCard
            icon={<Clock />}
            title="Response Time"
            value={`${report.responseTime} ms`}
            color="blue"
          />

          <StatCard
            icon={<Type />}
            title="H1 Count"
            value={report.h1Count}
            color="purple"
          />

          <StatCard
            icon={<Image />}
            title="Missing ALT"
            value={report.missingAltImages}
            color="orange"
          />

          <StatCard
            icon={<FileText />}
            title="Word Count"
            value={report.wordCount}
            color="cyan"
          />

          <StatCard
            icon={<Activity />}
            title="Health"
            value={
              report.seoScore >= 80
                ? "Excellent"
                : report.seoScore >= 60
                ? "Good"
                : "Needs Work"
            }
            color="emerald"
          />

        </div>

      </div>

      {/* Title */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <h2 className="mb-3 text-xl font-bold">
          Page Title
        </h2>

        <p className="text-slate-300">
          {report.title || "No title found"}
        </p>

      </div>

      {/* Meta */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <h2 className="mb-3 text-xl font-bold">
          Meta Description
        </h2>

        <p className="text-slate-300">
          {report.metaDescription || "No meta description available."}
        </p>

      </div>

      {/* Insights */}

      <Insights insights={report.insights} />

    </div>
  );
}