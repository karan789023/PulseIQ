import { useState } from "react";

import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {
  const [report, setReport] = useState(null);

  // Store complete error object
  const [error, setError] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-10">
        <Hero />

        <div className="mt-10">
          <SearchBar
            setReport={setReport}
            setError={setError}
          />
        </div>

        {/* Error Card */}

        {error && (
          <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-500/20 p-2">
                ❌
              </div>

              <div className="flex-1">
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
        )}

        {/* Dashboard */}

        {report && <Dashboard report={report} />}

        <Footer />
      </div>
    </main>
  );
}

export default App;