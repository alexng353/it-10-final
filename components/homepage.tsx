import React from "react";
import SearchBar from "./searchbar";

function Home() {
  return (
    <div className="title">
      <a href="/" >
        <div id="title-link" className="text-3xl font-bold text-green-500 onClick">
          hello <span className="text-white">tummy</span>
        </div>
      </a>
      <div className="text-gray-400">A grocery search engine for the future of shopping</div>
      <SearchBar />
    </div>
  );
}

export default Home;
