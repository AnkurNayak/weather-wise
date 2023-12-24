import { SearchBar } from "./components/SearchBar";
import { MainContainer } from "./components/MainContainer";
import { useWeatherState } from "./hooks/useWeatherState";
import { weatherFilter } from "./hooks/FilterWeather";
import { Background } from "./components/Backround";
import Quotes from "./quo.json";

export default function App() {
  const { weatherInfo, handleWeather } = useWeatherState();
  const filteredWeather = weatherFilter(weatherInfo);

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    return Quotes[randomIndex];
  }
  const randomQuo = getRandomQuote();

  return (
    <>
      <div className="flex relative h-screen flex-col">
        <div className="absolute top-0 left-0 w-full h-full">
          <Background />
        </div>
        <div className="relative z-10 w-full">
          <SearchBar handleWeather={handleWeather} />
        </div>
        {weatherInfo !== null || undefined ? (
          <MainContainer
            weather={filteredWeather}
            location={weatherInfo.location}
          />
        ) : (
          <div className="h-full items-center flex flex-col">
            <div className="flex-grow items-center justify-center flex flex-col z-10">
              <span>
                <h1 className="text-4xl font-bold">WEATHERWISE</h1>
                <h2 className="flex items-end justify-end">By Ancode</h2>
              </span>
              <p className="font-extralight max-w-full mt-auto">
                {randomQuo.quote}
              </p>
              <span className="italic">- {randomQuo.author}</span>
            </div>
            <div className="flex-1 flex items-center z-10">
              <button
                className=" bg-pink-600 p-4 rounded-lg"
                onClick={() =>
                  (window.location.href =
                    "https://github.com/AnkurNayak/weather-wise/blob/main/README.md")
                }
              >
                DOCUMENTATION
              </button>
            </div>
            <p className="text-slate-900 z-10 mb-10">
              &copy;2023 @ancode, All rights reserved{" "}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
