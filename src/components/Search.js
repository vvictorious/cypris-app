import "../sylesheets/search.scss";

const Search = ({ input, setInput, fetchData }) => {
  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData();
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
          placeholder="Find people, projects and more"
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
