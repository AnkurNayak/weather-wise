import React, { useState } from "react";

export function MainContainer({ weather, location }) {
  const currIcon = weather?.currentdata?.currcodedata?.icon;
  const currData = weather?.currentdata;
  const hourlyData = weather?.hourlydata;
  const dailyData = weather?.dailydata;

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleItems = isExpanded
    ? weather?.hourlydata?.hour
    : weather?.hourlydata?.hour?.slice(0, 7);

  return (
    <>
      <main className="main-container z-10">
        <div className="location-and-date">
          <h1 className="location-and-date__location">
            {location?.name},{location?.admin1}, {location?.country}
          </h1>
          <div>{currData?.date}</div>
        </div>

        <div className="current-temperature">
          <div className="current-temperature__icon-container">
            {currIcon !== undefined || null ? (
              <img
                src={require(`../assets/icons/weather-icons/${currIcon}`)}
                className="current-temperature__icon"
                alt=""
              />
            ) : null}
          </div>
          <div className="current-temperature__content-container">
            <div className="current-temperature__value">
              {Math.round(currData?.temperature)}&deg;
            </div>
            <div className="current-temperature__summary">
              {currData?.currcodedata?.sky}
            </div>
          </div>
        </div>

        <div className="current-stats">
          <div>
            <div className="current-stats__value">
              {Math.round(dailyData?.temperatureMax?.[0])}&deg;
            </div>
            <div className="current-stats__label">High</div>
            <div className="current-stats__value">
              {Math.round(dailyData?.temperatureMin?.[0])}&deg;
            </div>
            <div className="current-stats__label">Low</div>
          </div>
          <div>
            <div className="current-stats__value">{currData?.wind}km/h</div>
            <div className="current-stats__label">Wind</div>
            <div className="current-stats__value">{currData?.rain}mm</div>
            <div className="current-stats__label">Rain</div>
          </div>
          <div>
            <div className="current-stats__value">
              {dailyData?.sunrise?.[0]}
            </div>
            <div className="current-stats__label">Sunrise</div>
            <div className="current-stats__value">{dailyData?.sunset?.[0]}</div>
            <div className="current-stats__label">Sunset</div>
          </div>
        </div>

        <div className={`weather-by-hour ${isExpanded ? "expanded" : ""}`}>
          <h2 className="weather-by-hour__heading">Today's weather</h2>
          <div className="weather-by-hour__container">
            {visibleItems?.map((hour, index) => (
              <div className="weather-by-hour__item content" key={index}>
                <div className="weather-by-hour__hour">{hour}</div>
                {hourlyData?.hourcodedata?.[index] && ( // Access data at specific index
                  <div className="img__small">
                    <img
                      src={require(`../assets/icons/weather-icons/${hourlyData.hourcodedata[index].icon}`)}
                      alt={hourlyData.hourcodedata[index].sky}
                    />
                    <div>{Math.round(hourlyData?.temperature[index])}&deg;</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {hourlyData?.hour?.length >= 7 ? (
            <button
              onClick={handleExpansion}
              className="flex my-2 p-1 text-sm rounded-md bg-slate-900"
            >
              {isExpanded ? "Show less" : "View More..."}
            </button>
          ) : null}
        </div>

        <div className="next-5-days">
          <h2 className="next-5-days__heading">Next 5 days</h2>
          {dailyData?.day?.map((day, index) => (
            <div className="next-5-days__container" key={index}>
              <div className="next-5-days__row">
                <div className="next-5-days__date">
                  {day}
                  <div className="next-5-days__label">
                    {dailyData?.date[index]}
                  </div>
                </div>

                <div className="next-5-days__low">
                  {Math.round(dailyData?.temperatureMin[index])}&deg;
                  <div className="next-5-days__label">Low</div>
                </div>

                <div className="next-5-days__high">
                  {Math.round(dailyData?.temperatureMax[index])}&deg;
                  <div className="next-5-days__label">High</div>
                </div>

                <div className="next-5-days__icon">
                  <img
                    src={require(`../assets/icons/weather-icons/${dailyData?.dailycodedata[index].dayicon}`)}
                    alt="Sunny"
                  />
                </div>

                <div className="next-5-days__rain">
                  {dailyData?.rain[index]}mm
                  <div className="next-5-days__label">Rain</div>
                </div>

                <div className="next-5-days__wind">
                  {dailyData?.wind[index]}km/h
                  <div className="next-5-days__label">Wind</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
