
import { useState } from "react";
import { PiNoteFill } from "react-icons/pi";
import OpenDialog from "./dialog.Jsx";




export default function SearchBar({ onSearch }) {

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true)

  const handleSearch = () => {
    onSearch(query.trim());
  };



  return (
    <div className="flex items-center gap-2 mb-4 w-[100%] ">
      <input
        type="text"
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--text-C)] w-[70%]"
      />
      <button
        onClick={handleSearch}
        className="bg-[var(--text-C)] text-[var(--bg)] px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
      >
        Search
      </button>
      <button className="text-3xl cursor-pointer" title="search helper" onClick={() => setOpen(true)}>
        <PiNoteFill />
      </button>
      <button
        onClick={() => {
          setQuery("");
          onSearch("");
        }}
        className="text-[var(--text-C)] underline cursor-pointer"
      >
        Clear
      </button>
      <OpenDialog open={open} setOpen={setOpen}/>

    </div>
  );
}
