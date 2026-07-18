import { useState } from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
  const [view, setView] = useState<"form" | "results">("form");
  const [matches, setMatches] = useState<any[]>([]);

  const handleSuccess = (matchedScholarships: any[]) => {
    setMatches(matchedScholarships);
    setView("results");
  };

  const handleBack = () => {
    setView("form");
  };

  return (
    <>
      {view === "form" ? (
        <Home onSuccess={handleSuccess} />
      ) : (
        <Result matches={matches} onBack={handleBack} />
      )}
    </>
  );
}

export default App;