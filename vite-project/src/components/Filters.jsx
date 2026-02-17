function Filters({
  search,
  setSearch,
  region,
  setRegion,
  sortPopulation,
  setSortPopulation,
  clearFilters,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <button onClick={() => setSortPopulation(!sortPopulation)}>
        Sort by Population
      </button>

      <button onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

export default Filters;
