import { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";

import Search from "./components/Search";
import PapersList from "./components/PapersList";
import Chart from "./components/Chart";

function App() {
  const [primaryInput, setprimaryInput] = useState("");
  const [secondaryInput, setSecondaryInput] = useState("");
  const [keywordCounts, setKeywordCounts] = useState(null);
  const [papers, setPapers] = useState(null);

  console.log(keywordCounts)

  const countKeywordOccurrences = (papers) => {
    const keywordCounts = {};
    const words = primaryInput.trim().split(/\s+/);
    const keywords = words.filter(
      (word) => !["and", "or", "not"].includes(word.toLowerCase())
    );

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
    const queryString = encodeURIComponent(primaryInput);
    try {
      const response = await axios.get(
        `https://api.core.ac.uk/v3/search/works?q=(${queryString})${
          secondaryInput ? `&limit=${secondaryInput}` : ""
        }`
      );
      setPapers(response.data.results);
      countKeywordOccurrences(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setprimaryInput("");
    setSecondaryInput("");
  }

  return (
    <div className="App">
      <h1 className="title">Find Scholarly Papers</h1>
      <Search
        primaryInput={primaryInput}
        setprimaryInput={setprimaryInput}
        secondaryInput={secondaryInput}
        setSecondaryInput={setSecondaryInput}
        fetchData={fetchData}
      />

      <div className="flex-container">
        <PapersList papers={papers} />
        <Chart />
      </div>
    </div>
  );
}

export default App;
