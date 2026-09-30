function SearchBar({
  searchCity,
  setSearchCity,
  onSearch,
}) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Enter city name..."
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
