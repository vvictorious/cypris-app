import "../sylesheets/search.scss";

const Search = ({ input, setInput, fetchData }) => {
  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleSecondaryInputChange = (e) => {
    // Implement any logic for handling changes in the secondary input
    console.log("Secondary input value:", e.target.value);
  };

  return (
    <div className="search-container">
      <form action="/search" method="GET">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id="search-input"
          name="search input"
          className="search-input"
          placeholder="What subject are you interested in?"
        />
        <input
          type="number"
          onChange={handleSecondaryInputChange}
          className="secondary-input"
          placeholder="Max number of papers"
        />
        <button
          onClick={handleSearchClick}
          type="button"
          className="search-button"
          disabled={input.length === 0}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;