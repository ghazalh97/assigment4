import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import CountryList from "./components/CountryList";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [sortPopulation, setSortPopulation] = useState(false);

  // ✅ PROFESSIONAL DEBOUNCE LOGIC (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    // Cleanup prevents multiple API calls
    return () => clearTimeout(timer);
  }, [search]);

  // ✅ FETCH LOGIC
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "";

        if (debouncedSearch.length >= 2) {
          url = `https://restcountries.com/v3.1/name/${debouncedSearch}`;
        } else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}`;
        } else {
          url = "https://restcountries.com/v3.1/all";
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        setCountries(data);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [debouncedSearch, region]);

  const sortedCountries = [...countries].sort((a, b) => {
    if (!sortPopulation) return 0;
    return (b.population || 0) - (a.population || 0);
  });

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setSortPopulation(false);
  };

  return (
    <div className="app">
      <Header />

      <Filters
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        sortPopulation={sortPopulation}
        setSortPopulation={setSortPopulation}
        clearFilters={clearFilters}
      />

      {loading && <p className="message">Loading countries...</p>}

      {error && (
        <div className="message error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && sortedCountries.length === 0 && (
        <p className="message">No results found.</p>
      )}

      {!loading && !error && (
        <CountryList countries={sortedCountries} />
      )}
    </div>
  );
}

export default App;
