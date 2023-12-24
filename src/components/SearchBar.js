import SearchSVG from "../assets/icons/search.svg";
import React, { useEffect, useState, useRef } from "react";
import { useLocationState } from "../hooks/useLocationState";
import { SearchBox } from "./SearchBox";

export function SearchBar({ handleWeather }) {
  const {
    searchInput,
    locations,
    isLoading,
    handleInputBox,
    handleSearchInput,
  } = useLocationState();

  const [isOpen, setIsOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const hasSearchInput = searchInput.trim() !== "";

  //Handle If user is clicking outside the search box the result box should disappear
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  return (
    <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
      <div
        ref={searchBoxRef}
        className="bg-white rounded-lg overflow-hidden text-slate-700"
      >
        <div className="border-b border-slate-500 flex items-center">
          <img className="h-6 w-6 mx-2" src={SearchSVG} alt="search.ico" />
          <input
            type="text"
            className="flex w-full py-2 focus:outline-none bg-transparent whitespace-nowrap text-ellipsis overflow-hidden"
            value={searchInput}
            onChange={(e) => handleInputBox(e.target.value)}
            onClick={() => setIsOpen(true)}
            placeholder="Search Loction...."
          />
        </div>
        {isOpen ? (
          <SearchBox
            locations={locations}
            isLoading={isLoading}
            hasSearchInput={hasSearchInput}
            setIsOpen={setIsOpen}
            onSearchInput={handleSearchInput}
            handleWeather={handleWeather}
          />
        ) : null}
      </div>
    </form>
  );
}
