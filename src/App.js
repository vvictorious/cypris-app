import { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";

import Search from "./components/Search";

function App() {
  const [input, setInput] = useState("");
  const [papers, setPapers] = useState(null);

  console.log(papers);

  async function fetchData() {
    console.log("FIRED");
    const queryString = encodeURIComponent(input);
    console.log('queryString', queryString)
    try {
      const response = await axios.get(
        `https://api.core.ac.uk/v3/search/works?q=(${queryString})`
      );
      console.log("DATA:", response.data.results);
      setPapers(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setInput("");
  }

  return (
    <div className="App">
      <Search input={input} setInput={setInput} fetchData={fetchData} />
    </div>
  );
}

export default App;
