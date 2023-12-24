import { format, compareAsc } from "date-fns";
import { enUS } from "date-fns/locale";
import WeatherCodes from "../data.json";

export function weatherFilter(weather) {
  const currentData = weather?.weather?.current;
  const hourlyData = weather?.weather?.hourly;
  const dailyData = weather?.weather?.daily;

  //Functions
  const weathercodeMatch = (code) => WeatherCodes[code];

  const next24Hours = (hours) =>
    hours?.map((hour) => (hour % 12 || 12) + " " + (hour < 12 ? "AM" : "PM"));

  const getHourCodeData = (data, hour) =>
    hour >= 6 && hour <= 18
      ? { sky: data?.sky, icon: data?.dayicon }
      : { sky: data?.sky, icon: data?.nighticon };

  const getTime = (date) =>
    date?.map((time) =>
      new Date(time).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
    );

  const next24HoursData = (data, currIndex) =>
    currIndex !== -1 ? data?.slice(currIndex, currIndex + 24) : null;

  // Current
  const currHour = new Date(currentData?.time).getHours();
  const formattedDate = currentData?.time
    ? format(new Date(currentData.time), "EEEE d MMMM", { locale: enUS })
    : "";
  const currentCodeData = getHourCodeData(
    weathercodeMatch(currentData?.weather_code),
    currHour
  );

  //Hourly
  /*time*/
  const hourlyHourArray = hourlyData?.time?.map((date) =>
    new Date(date).getHours()
  );
  const currIndex = hourlyHourArray?.indexOf(currHour);

  const hourArr = next24HoursData(hourlyData?.time, currIndex)?.map((data) =>
    new Date(data).getHours()
  );

  const converted12Hour = next24Hours(hourArr);
  /*weatherCode*/
  const hourlyCodeData = next24HoursData(
    hourlyData?.weather_code,
    currIndex
  )?.map((code) => weathercodeMatch(code));

  // console.log(hourArr);
  const hourCodeData = hourlyCodeData?.map((data, index) => {
    const hour = hourArr[index];
    return getHourCodeData(data, hour);
  });

  const hourlyTemperature = next24HoursData(
    hourlyData?.temperature_2m,
    currIndex
  );

  //Daily
  const getDay = dailyData?.time?.map((time) => format(new Date(time), "EEE"));
  const getDate = dailyData?.time?.map((time) => format(new Date(time), "d/M"));
  const weatherInfo = dailyData?.weather_code?.map((code) =>
    weathercodeMatch(code)
  );

  //Current Data returns
  const currentdata = {
    date: formattedDate,
    temperature: currentData?.temperature_2m,
    code: currentData?.weather_code,
    isDay: currentData?.is_day,
    currcodedata: currentCodeData,
    wind: currentData?.wind_speed_10m,
    rain: currentData?.rain,
  };

  const hourlydata = {
    hour: converted12Hour,
    hourcodedata: hourCodeData,
    temperature: hourlyTemperature,
  };

  //Daily Data
  const dailydata = {
    date: getDate,
    temperatureMax: dailyData?.temperature_2m_max,
    temperatureMin: dailyData?.temperature_2m_min,
    sunrise: getTime(dailyData?.sunrise),
    sunset: getTime(dailyData?.sunset),
    rain: dailyData?.rain_sum,
    code: dailyData?.weather_code,
    wind: dailyData?.wind_speed_10m_max,
    day: getDay,
    dailycodedata: weatherInfo,
  };

  return {
    currentdata,
    hourlydata,
    dailydata,
  };
}
