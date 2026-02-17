import CountryCard from "./CountryCard";

function CountryList({ countries }) {
  return (
    <div className="grid">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryList;
