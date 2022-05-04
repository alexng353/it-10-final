import React from "react"
import SearchBar from "../components/searchbar"

function Home() {
  return (
    <div className='title'>
      <div className='text-3xl font-bold text-green-500'>hello <span className='text-white'>tummy</span></div>
      <div className="text-gray-400">
        A modern, beautiful grocery search engine.
      </div>
      <SearchBar />
    </div>
  )
}

export default Home
