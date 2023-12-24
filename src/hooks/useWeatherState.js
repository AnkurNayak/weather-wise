import { useState } from "react";

export const useWeatherState = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const handleWeather = async (location) => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    try {
      const api = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,temperature_80m,temperature_120m,temperature_180m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto`
      );
      const res = await api.json();
      setWeatherInfo({ location: location, weather: res });
    } catch (err) {
      console.log(err);
    }
    // console.log(weatherInfo);
  };

  return {
    weatherInfo,
    handleWeather,
  };
};
