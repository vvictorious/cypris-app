import { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";

import Search from "./components/Search";

function App() {
  const [input, setInput] = useState("");
  const [keywordCounts, setKeywordCounts] = useState(null);

  console.log("keywordCounts", keywordCounts);

  const countKeywordOccurrences = (papers, keywords) => {
    const keywordCounts = {};

    papers.forEach((paper) => {
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        const matches = paper.title.match(regex);
        const count = matches ? matches.length : 0;
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + count;
      });
    });

    setKeywordCounts(keywordCounts);
  };

  async function fetchData() {
    console.log("FIRED");
    const words = input.trim().split(/\s+/);
    const keywords = words.filter(
      (word) => !["and", "or", "not"].includes(word.toLowerCase())
    );

    const queryString = encodeURIComponent(input);
    console.log("queryString", queryString);

    try {
      const response = await axios.get(
        `https://api.core.ac.uk/v3/search/works?q=(${queryString})&limit=5`
      );
      console.log(response.data.results)
      countKeywordOccurrences(response.data.results, keywords);
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
