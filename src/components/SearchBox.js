export function SearchBox({
  locations,
  isLoading,
  hasSearchInput,
  setIsOpen,
  onSearchInput,
  handleWeather,
}) {
  const handleClick = (location) => {
    // console.log(location);
    setIsOpen(false);
    onSearchInput(location);
    handleWeather(location);
  };

  return (
    <div
      className={`search-box ${
        isLoading ? "loading" : hasSearchInput ? "results" : ""
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
            <div className="spinner"></div>
          </div>
        </div>
      ) : (
        <>
          {hasSearchInput &&
            (locations?.results?.length > 0 ? (
              <div className="result-box">
                {locations.results.map((location) => (
                  <div
                    key={location.id}
                    className="cursor-pointer hover:bg-slate-200 overflow-hidden py-2"
                    onClick={() => handleClick(location)}
                  >
                    <p className="ml-10">
                      {location.name}, {location.admin1}, {location.country}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ml-10 p-2">No results found.</div>
            ))}
        </>
      )}
    </div>
  );
}
