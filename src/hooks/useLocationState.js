import { useEffect, useState } from "react";

const LocationAPI = "https://geocoding-api.open-meteo.com/v1/search?name=";

export function useLocationState() {
  const [searchInput, setSearchInput] = useState("");
  const [locations, setLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputBox = (inputValue) => {
    setSearchInput(inputValue);
  };

  const handleSearchInput = (location) => {
    setSearchInput(location.name);
  };

  useEffect(() => {
    const minLength = 3;
    const debounceTimeout = setTimeout(() => {
      const regex = new RegExp(`^[^,]{${minLength},}`);
      const match = searchInput.match(regex);
      const searchValue = match ? match[0] : "";

      if (searchValue.length >= minLength) {
        const fetchLocations = async () => {
          setIsLoading(true);
          setError(null);

          try {
            const api = await fetch(`${LocationAPI}${searchValue}`);
            const res = await api.json();
            setLocations(res);
          } catch (err) {
            setError("Error fetching locations. Please try again.");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        };

        fetchLocations();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  return {
    searchInput,
    locations,
    isLoading,
    error,
    handleInputBox,
    handleSearchInput,
  };
}
