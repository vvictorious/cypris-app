import "../sylesheets/search.scss";

const Search = ({
  primaryInput,
  setprimaryInput,
  secondaryInput,
  setSecondaryInput,
  fetchData,
}) => {
  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="search-container">
      <form action="/search" method="GET">
        <input
          value={primaryInput}
          onChange={(e) => setprimaryInput(e.target.value)}
          type="text"
          id="search-input"
          name="search input"
          className="search-input"
          placeholder="What subject are you interested in?"
        />
        <input
          value={secondaryInput}
          type="number"
          onChange={(e) => setSecondaryInput(e.target.value)}
          className="secondary-input"
          placeholder="Max number of papers"
        />
        <button
          onClick={handleSearchClick}
          type="button"
          className="search-button"
          disabled={primaryInput.length === 0}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
